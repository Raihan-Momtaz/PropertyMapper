namespace PropertyNormalizerApi.Models
{
    public record AddressParts(
        string? Street,
        string? Suburb,
        string? State,
        string? Postcode
    );
}