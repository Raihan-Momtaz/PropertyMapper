import React, { useState } from "react";
import type { ExternalProperty, InternalProperty, VolumeFolio } from "./types";
import PropertyCard from "./components/PropertyCard";
import { normalizeProperty, updateVolumeFolio, getPropertyById } from "./api/propertyApi";
import "./App.css"; // import styles

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
    <div className="app-container">
      <button className="btn primary" onClick={handleNormalize} type="button">
        Normalize Property
      </button>

      <div className="property-card-container">
        {propertyData && (
          <PropertyCard
            property={propertyData.property}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default App;
