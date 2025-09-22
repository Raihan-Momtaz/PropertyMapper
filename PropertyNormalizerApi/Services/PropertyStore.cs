using PropertyNormalizerApi.Models;
using System.Collections.Concurrent;

namespace PropertyNormalizerApi.Services
{
    public class PropertyStore
    {
        // Thread-safe dictionary to store properties
        private readonly ConcurrentDictionary<string, InternalProperty> _properties = new();

        // Get property by ID
        public InternalProperty? Get(string id)
        {
            _properties.TryGetValue(id, out var prop);
            return prop;
        }

        // Add or update property
        public void AddOrUpdate(string id, InternalProperty property)
        {
            _properties.AddOrUpdate(id, property, (key, existing) => property);
        }
    }
}
