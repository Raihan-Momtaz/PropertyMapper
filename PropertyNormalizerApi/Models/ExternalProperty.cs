

    namespace PropertyNormalizerApi.Models
{
    public record ExternalProperty(
        string? Provider,
        string? RequestId,
        DateTimeOffset? ReceivedAt,
        AddressParts? AddressParts,
        string? FormattedAddress,
        LotPlan? LotPlan,
        Title? Title,
        object? Extra
    );
}


