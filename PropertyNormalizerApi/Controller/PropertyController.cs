// -------------------------
// Controllers/PropertyController.cs
// -------------------------
using Microsoft.AspNetCore.Mvc;  
// ASP.NET Core namespace for building API controllers

using PropertyNormalizerApi.Models;  
// Import models (InternalProperty, ExternalProperty, VolumeFolio, etc.)

using PropertyNormalizerApi.Services;  
// Import services (PropertyStore) for data storage/retrieval

using System.Text.RegularExpressions;  
// Import Regex for validating volume/folio

namespace PropertyNormalizerApi.Controllers
{
    [ApiController]  
    // Marks this class as an API controller (handles JSON requests/responses)

    [Route("api/property")]  
    // Base route for all endpoints in this controller
    public class PropertyController : ControllerBase
    {
        private readonly PropertyStore _store;  
        // Reference to an in-memory property store service

        public PropertyController(PropertyStore store)
        {
            _store = store;  
            // Constructor injects the store dependency
        }

        // -------------------------
        // Helper method: server-side validation for Volume/Folio
        // -------------------------
        private bool IsValidVolumeFolio(VolumeFolio vf, out string error)
        {
            error = ""; // Initialize error message

            // Validate Volume: must be 1–6 digits
            if (vf.Volume is null || !Regex.IsMatch(vf.Volume, @"^\d{1,6}$"))
            {
                error = "Volume must be 1–6 digits";
                return false;
            }

            // Validate Folio: must be 1–5 digits
            if (vf.Folio is null || !Regex.IsMatch(vf.Folio, @"^\d{1,5}$"))
            {
                error = "Folio must be 1–5 digits";
                return false;
            }

            return true; // Valid
        }

        // -------------------------
        // POST: /api/property/normalize
        // Normalizes an external property and stores it
        // -------------------------
        [HttpPost("normalize")]
        public ActionResult Normalize([FromBody] ExternalProperty property)
        {
            var result = PropertyNormalizer.NormalizeProperty(property);  
            // Convert external property to internal format

            // Server-side validation for Volume/Folio
            if (!IsValidVolumeFolio(result.VolumeFolio, out var error))
            {
                return BadRequest(new { message = error });  
                // Return 400 if invalid
            }

            // Use RequestId if provided; otherwise generate a new GUID
            var id = property.RequestId ?? Guid.NewGuid().ToString();

            _store.AddOrUpdate(id, result);  
            // Save or update property in in-memory store

            return Ok(new { Id = id, Property = result });  
            // Return stored property with ID
        }

        // -------------------------
        // GET: /api/property/{id}
        // Retrieve a property by ID
        // -------------------------
        [HttpGet("{id}")]
        public ActionResult<InternalProperty> Get(string id)
        {
            var prop = _store.Get(id);  
            // Fetch property from store

            if (prop == null) return NotFound();  
            // Return 404 if not found

            return Ok(prop);  
            // Return the property if found
        }

        // -------------------------
        // PATCH: /api/property/{id}
        // Update only the Volume/Folio of an existing property
        // -------------------------
        [HttpPatch("{id}")]
        public ActionResult<InternalProperty> UpdateVolumeFolio(string id, [FromBody] VolumeFolio updated)
        {
            var prop = _store.Get(id);  
            // Fetch the existing property

            if (prop == null) return NotFound();  
            // Return 404 if property does not exist

            // Server-side validation
            if (!IsValidVolumeFolio(updated, out var error))
            {
                return BadRequest(new { message = error });  
                // Return 400 if invalid
            }

            // Create a new record with updated VolumeFolio
            var updatedProp = prop with { VolumeFolio = updated };  
            // `with` creates a copy of the record with updated field

            _store.AddOrUpdate(id, updatedProp);  
            // Save updated property to store

            return Ok(updatedProp);  
            // Return the updated property
        }
    }
}
