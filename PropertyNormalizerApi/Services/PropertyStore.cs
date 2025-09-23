using PropertyNormalizerApi.Models;  
// Import your data models (InternalProperty, etc.)

using System.Collections.Concurrent;  
// Import thread-safe collection types

namespace PropertyNormalizerApi.Services
{
    // -------------------------
    // In-memory store for InternalProperty objects
    // -------------------------
    public class PropertyStore
    {
        // Thread-safe dictionary to store properties by ID
        private readonly ConcurrentDictionary<string, InternalProperty> _properties = new();

        // -------------------------
        // Retrieve a property by ID
        // -------------------------
        public InternalProperty? Get(string id)
        {
            // Try to get the property from the dictionary
            _properties.TryGetValue(id, out var prop);

            // Returns the property if found, otherwise null
            return prop;
        }

        // -------------------------
        // Add a new property or update an existing one
        // -------------------------
        public void AddOrUpdate(string id, InternalProperty property)
        {
            // Add new or overwrite existing property with the same key
            // The lambda ensures that even if the key exists, the property gets replaced
            _properties.AddOrUpdate(id, property, (key, existing) => property);
        }
    }
}
