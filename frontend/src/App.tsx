import React, { useState } from "react";
import type { ExternalProperty, InternalProperty, VolumeFolio } from "./types";
import PropertyCard from "./components/PropertyCard";
import { normalizeProperty, updateVolumeFolio, getPropertyById } from "./api/propertyApi";

const App: React.FC = () => {
  const [propertyData, setPropertyData] = useState<{
    id: string;
    property: InternalProperty;
  } | null>(null);

  const [propertyIdInput, setPropertyIdInput] = useState("");

  const handleFetchById = async () => {
    try {
      const property = await getPropertyById(propertyIdInput);
      setPropertyData({ id: propertyIdInput, property });
      console.log(property);
    } catch (err) {
      console.error("Failed to fetch property:", err);
    }
  };

  const handleNormalize = async () => {
    const externalProperty: ExternalProperty = {
      provider: "ExampleProvider",
      requestId: "REQ123",
      formattedAddress: "123 Main St, Melbourne, VIC 3000",
      title: { volume: "1234", folio: "56" },
    };

    try {
      const result = await normalizeProperty(externalProperty);
      setPropertyData({ id: result.id, property: result.property });
    } catch (err) {
      console.error("Error normalizing property:", err);
    }
  };

  const handleUpdate = async (vf: VolumeFolio) => {
    if (!propertyData) return;
    try {
      const updatedProp = await updateVolumeFolio(propertyData.id, vf);
      setPropertyData({ id: propertyData.id, property: updatedProp });
    } catch (err) {
      console.error("Failed to update Volume/Folio", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter property ID"
          value={propertyIdInput}
          onChange={(e) => setPropertyIdInput(e.target.value)}
        />
        <button onClick={handleFetchById}>Fetch Property</button>
      </div>
      <button onClick={handleNormalize}>Normalize Property</button>

      {propertyData && (
        <PropertyCard
          property={propertyData.property}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default App;
