// -------------------------
// Services/PropertyNormalizer.cs
// -------------------------
using PropertyNormalizerApi.Models;  
// Import models (InternalProperty, ExternalProperty, VolumeFolio, SourceTrace, etc.)

namespace PropertyNormalizerApi.Services
{
    // Static service class for normalizing external property data
    public static class PropertyNormalizer
    {
        // -------------------------
        // Convert an ExternalProperty into an InternalProperty
        // -------------------------
        public static InternalProperty NormalizeProperty(ExternalProperty p)
        {
            string fullAddress;

            // -------------------------
            // Determine the full address
            // -------------------------
            if (!string.IsNullOrWhiteSpace(p.FormattedAddress))
            {
                // Use the formatted address if provided
                fullAddress = p.FormattedAddress!;
            }
            else if (p.AddressParts != null)
            {
                // If AddressParts are provided, concatenate them
                fullAddress = $"{p.AddressParts.Street} {p.AddressParts.Suburb} {p.AddressParts.State} {p.AddressParts.Postcode}"
                              .Replace("  ", " ") // Remove double spaces if some parts are missing
                              .Trim();            // Remove leading/trailing spaces
            }
            else
            {
                // Fallback if no address info is provided
                fullAddress = "Unknown Address";
            }

            // -------------------------
            // Extract volume and folio from Title
            // -------------------------
            string? volume = string.IsNullOrWhiteSpace(p.Title?.Volume) ? null : p.Title?.Volume;
            string? folio = string.IsNullOrWhiteSpace(p.Title?.Folio) ? null : p.Title?.Folio;

            // -------------------------
            // Determine status based on volume/folio presence
            // -------------------------
            string status = (volume == null && folio == null) ? "UnknownVolFol" : "KnownVolFol";

            // -------------------------
            // Create and return InternalProperty
            // -------------------------
            return new InternalProperty(
                FullAddress: fullAddress,             // Full address string
                LotPlan: p.LotPlan,                   // Optional Lot/Plan info
                VolumeFolio: new VolumeFolio(volume, folio), // Volume/Folio object
                Status: status,                       // Status (KnownVolFol / UnknownVolFol)
                SourceTrace: new SourceTrace(
                    p.Provider,                       // Provider name
                    p.RequestId,                      // Request ID
                    p.ReceivedAt?.ToString("o")       // Received timestamp in ISO 8601 format
                )
            );
        }
    }
}
