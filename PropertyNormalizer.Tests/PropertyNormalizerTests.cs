using System;
using Xunit;
using FluentAssertions;
using PropertyNormalizerApi.Services; // <- this is where PropertyNormalizer lives
using PropertyNormalizerApi.Models;   // <- for ExternalProperty, Title, etc.

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

            var result = PropertyNormalizer.NormalizeProperty(external);

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

            var result = PropertyNormalizer.NormalizeProperty(external);

            result.Status.Should().Be("UnknownVolFol");
            result.VolumeFolio.Volume.Should().BeNull();
            result.VolumeFolio.Folio.Should().BeNull();
            result.FullAddress.Should().Be("456 High St, Sydney, NSW 2000");
        }
    }
}
