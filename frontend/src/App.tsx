import React, { useState } from "react"; 
// Import React and useState hook for managing component state

import type { ExternalProperty, InternalProperty, VolumeFolio } from "./types"; 
// Import TypeScript types for type-checking

import PropertyCard from "./components/PropertyCard"; 
// Import the child component that displays each property

import { normalizeProperty, updateVolumeFolio, getPropertyById } from "./api/propertyApi"; 
// Import API functions for property operations:
// - normalizeProperty: convert an external property into internal format
// - updateVolumeFolio: update volume/folio of a property
// - getPropertyById: fetch a property by its ID

import "./App.css"; 
// Import general app styles

const App: React.FC = () => {
  // -------------------------
  // State for the current property
  // -------------------------
  const [propertyData, setPropertyData] = useState<{
    id: string;
    property: InternalProperty;
  } | null>(null); 
  // Stores the currently selected property and its ID
  // Initially null (no property loaded)

  // -------------------------
  // State for the property ID input
  // -------------------------
  const [propertyIdInput, setPropertyIdInput] = useState(""); 
  // Stores user input for property ID to fetch

  // -------------------------
  // Function to fetch property by ID
  // -------------------------
  const handleFetchById = async () => {
    try {
      const property = await getPropertyById(propertyIdInput); 
      // Call API to get property details by ID

      setPropertyData({ id: propertyIdInput, property }); 
      // Update state with fetched property
    } catch (err) {
      console.error("Failed to fetch property:", err); 
      // Log error if API call fails
    }
  };

  // -------------------------
  // Function to normalize a new property
  // -------------------------
  const handleNormalize = async () => {
    const externalProperty: ExternalProperty = {
      provider: "ExampleProvider", // Name of external data source
      requestId: "REQ123", // Request ID for tracking
      formattedAddress: "123 Main St, Melbourne, VIC 3000", // Example address
      title: { volume: "1234", folio: "56" }, // Example volume/folio
    };

    try {
      const result = await normalizeProperty(externalProperty); 
      // Call API to normalize the property

      setPropertyData({ id: result.id, property: result.property }); 
      // Update state with normalized property
    } catch (err) {
      console.error("Error normalizing property:", err); 
      // Log error if normalization fails
    }
  };

  // -------------------------
  // Function to update volume/folio of a property
  // -------------------------
  const handleUpdate = async (vf: VolumeFolio) => {
    if (!propertyData) return; 
    // Do nothing if no property is loaded

    try {
      const updatedProp = await updateVolumeFolio(propertyData.id, vf); 
      // Call API to update volume/folio

      setPropertyData({ id: propertyData.id, property: updatedProp }); 
      // Update state with the new property data
    } catch (err) {
      console.error("Failed to update Volume/Folio", err); 
      // Log error if update fails
    }
  };

  // -------------------------
  // JSX: Render the app
  // -------------------------
  return (
    <div className="app-container">
      {/* Button to normalize a new property */}
      <button className="btn primary" onClick={handleNormalize} type="button">
        Normalize Property
      </button>

      {/* Container for property cards */}
      <div className="property-card-container">
        {propertyData && (
          // Render PropertyCard only if propertyData exists
          <PropertyCard
            property={propertyData.property} // Pass property details
            onUpdate={handleUpdate}          // Pass update callback
          />
        )}
      </div>
    </div>
  );
};

export default App; 
// Export component for use in index.tsx or other parent components
