using System;
using Xunit;
using FluentAssertions;
using PropertyNormalizerApi.Models;   // For ExternalProperty, Title, etc.

namespace PropertyNormalizerApi.Tests
{
    public class PropertyNormalizerTests
    {
        [Fact]
        public void NormalizeProperty_ShouldReturnKnownVolFol_WhenVolumeAndFolioExist()
        {
            var external = new ExternalProperty(
                Provider: "TestProvider",
                RequestId: "REQ001",
                ReceivedAt: DateTimeOffset.Now,
                AddressParts: null,
                FormattedAddress: "123 Main St, Melbourne, VIC 3000",
                LotPlan: null,
                Title: new Title("1234", "56"),
                Extra: null
            );

            var result = PropertyNormalizerApi.Services.PropertyNormalizer.NormalizeProperty(external);

            result.Status.Should().Be("KnownVolFol");
            result.VolumeFolio.Volume.Should().Be("1234");
            result.VolumeFolio.Folio.Should().Be("56");
            result.FullAddress.Should().Be("123 Main St, Melbourne, VIC 3000");
            result.SourceTrace.Provider.Should().Be("TestProvider");
        }

        [Fact]
        public void NormalizeProperty_ShouldReturnUnknownVolFol_WhenVolumeAndFolioMissing()
        {
            var external = new ExternalProperty(
                Provider: null,
                RequestId: null,
                ReceivedAt: null,
                AddressParts: null,
                FormattedAddress: "456 High St, Sydney, NSW 2000",
                LotPlan: null,
                Title: new Title(null, null),
                Extra: null
            );

            var result = PropertyNormalizerApi.Services.PropertyNormalizer.NormalizeProperty(external);

            result.Status.Should().Be("UnknownVolFol");
            result.VolumeFolio.Volume.Should().BeNull();
            result.VolumeFolio.Folio.Should().BeNull();
            result.FullAddress.Should().Be("456 High St, Sydney, NSW 2000");
        }

        [Fact]
        public void NormalizeProperty_ShouldComposeAddress_WhenFormattedAddressIsNull()
        {
            var external = new ExternalProperty(
                Provider: "TestProvider",
                RequestId: "REQ002",
                ReceivedAt: DateTimeOffset.Now,
                AddressParts: new AddressParts(
                    Street: "789 Collins St",
                    Suburb: "Docklands",
                    State: "VIC",
                    Postcode: "3008"
                ),
                FormattedAddress: null,
                LotPlan: null,
                Title: new Title("1234", "56"),
                Extra: null
            );

            var result = PropertyNormalizerApi.Services.PropertyNormalizer.NormalizeProperty(external);

            result.FullAddress.Should().Be("789 Collins St Docklands VIC 3008");
            result.Status.Should().Be("KnownVolFol");
        }

        [Fact]
        public void NormalizeProperty_ShouldPreserveSourceTrace()
        {
            var now = DateTimeOffset.Now;

            var external = new ExternalProperty(
                Provider: "ProviderX",
                RequestId: "REQ123",
                ReceivedAt: now,
                AddressParts: null,
                FormattedAddress: "10 King St, Brisbane, QLD 4000",
                LotPlan: null,
                Title: new Title("5678", "90"),
                Extra: null
            );

            var result = PropertyNormalizerApi.Services.PropertyNormalizer.NormalizeProperty(external);

            result.SourceTrace.Provider.Should().Be("ProviderX");
            result.SourceTrace.RequestId.Should().Be("REQ123");
            result.SourceTrace.ReceivedAt.Should().Be(now.ToString("o"));
        }

    }
}
