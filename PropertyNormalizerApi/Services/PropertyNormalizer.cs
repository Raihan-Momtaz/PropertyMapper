// Services/PropertyNormalizer.cs
using PropertyNormalizerApi.Models;

namespace PropertyNormalizerApi.Services
{
    public static class PropertyNormalizer
    {
        public static InternalProperty NormalizeProperty(ExternalProperty p)
        {
            string fullAddress;

            if (!string.IsNullOrWhiteSpace(p.FormattedAddress))
            {
                fullAddress = p.FormattedAddress!;
            }
            else if (p.AddressParts != null)
            {
                fullAddress = $"{p.AddressParts.Street} {p.AddressParts.Suburb} {p.AddressParts.State} {p.AddressParts.Postcode}"
                              .Replace("  ", " ").Trim();
            }
            else
            {
                fullAddress = "Unknown Address";
            }

            string? volume = string.IsNullOrWhiteSpace(p.Title?.Volume) ? null : p.Title?.Volume;
            string? folio = string.IsNullOrWhiteSpace(p.Title?.Folio) ? null : p.Title?.Folio;

            string status = (volume == null && folio == null) ? "UnknownVolFol" : "KnownVolFol";

            return new InternalProperty(
                FullAddress: fullAddress,
                LotPlan: p.LotPlan,
                VolumeFolio: new VolumeFolio(volume, folio),
                Status: status,
                SourceTrace: new SourceTrace(p.Provider, p.RequestId, p.ReceivedAt?.ToString("o"))
            );
        }
    }
}
