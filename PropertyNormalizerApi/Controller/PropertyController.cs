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
        [HttpPost("normalize")]
        public ActionResult<InternalProperty> Normalize([FromBody] ExternalProperty property)
        {
            var result = PropertyNormalizer.NormalizeProperty(property);
            return Ok(result);
        }
    }
}
