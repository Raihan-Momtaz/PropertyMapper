// Controllers/PropertyController.cs
using Microsoft.AspNetCore.Mvc;
using PropertyNormalizerApi.Models;
using PropertyNormalizerApi.Services;
using System.Text.RegularExpressions;

namespace PropertyNormalizerApi.Controllers
{
    [ApiController]
    [Route("api/property")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyStore _store;

        public PropertyController(PropertyStore store)
        {
            _store = store;
        }

        // Helper for server-side validation
        private bool IsValidVolumeFolio(VolumeFolio vf, out string error)
        {
            error = "";
            if (vf.Volume is null || !Regex.IsMatch(vf.Volume, @"^\d{1,6}$"))
            {
                error = "Volume must be 1–6 digits";
                return false;
            }
            if (vf.Folio is null || !Regex.IsMatch(vf.Folio, @"^\d{1,5}$"))
            {
                error = "Folio must be 1–5 digits";
                return false;
            }
            return true;
        }

        [HttpPost("normalize")]
        public ActionResult Normalize([FromBody] ExternalProperty property)
        {
            var result = PropertyNormalizer.NormalizeProperty(property);

            // Server-side validation
            if (!IsValidVolumeFolio(result.VolumeFolio, out var error))
            {
                return BadRequest(new { message = error });
            }

            // Use RequestId or a new GUID as the key
            var id = property.RequestId ?? Guid.NewGuid().ToString();
            _store.AddOrUpdate(id, result);

            return Ok(new { Id = id, Property = result });
        }

        [HttpGet("{id}")]
        public ActionResult<InternalProperty> Get(string id)
        {
            var prop = _store.Get(id);
            if (prop == null) return NotFound();
            return Ok(prop);
        }

        [HttpPatch("{id}")]
        public ActionResult<InternalProperty> UpdateVolumeFolio(string id, [FromBody] VolumeFolio updated)
        {
            var prop = _store.Get(id);
            if (prop == null) return NotFound();

            // Server-side validation
            if (!IsValidVolumeFolio(updated, out var error))
            {
                return BadRequest(new { message = error });
            }

            // Create a new record with updated VolumeFolio
            var updatedProp = prop with { VolumeFolio = updated };
            _store.AddOrUpdate(id, updatedProp);

            return Ok(updatedProp);
        }
    }
}
