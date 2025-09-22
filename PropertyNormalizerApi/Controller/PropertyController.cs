// Controllers/PropertyController.cs
using Microsoft.AspNetCore.Mvc;
using PropertyNormalizerApi.Models;
using PropertyNormalizerApi.Services;

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

        [HttpPost("normalize")]
        public ActionResult<InternalProperty> Normalize([FromBody] ExternalProperty property)
        {
            var result = PropertyNormalizer.NormalizeProperty(property);

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

            // Create a new record with updated VolumeFolio
            var updatedProp = prop with { VolumeFolio = updated };
            _store.AddOrUpdate(id, updatedProp);

            return Ok(updatedProp);
        }





    }
}
