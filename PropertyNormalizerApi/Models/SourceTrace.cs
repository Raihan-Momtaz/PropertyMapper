namespace PropertyNormalizerApi.Models
{
    public record SourceTrace(
        string? Provider,
        string? RequestId,
        string? ReceivedAt
    );
}