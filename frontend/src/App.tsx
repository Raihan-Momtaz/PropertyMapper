import React, { useState } from "react";
import type { ExternalProperty, InternalProperty, VolumeFolio } from "./types";
import PropertyCard from "./components/PropertyCard";
import { normalizeProperty } from "./api/propertyApi";

const App: React.FC = () => {
  const [property, setProperty] = useState<InternalProperty | null>(null);

  const handleNormalize = async () => {
    const externalProperty: ExternalProperty = {
      provider: "ExampleProvider",
      requestId: "REQ123",
      formattedAddress: "123 Main St, Melbourne, VIC 3000",
      title: { volume: "1234", folio: "56" },
    };

    try {
      const result = await normalizeProperty(externalProperty);
      setProperty(result);
    } catch (err) {
      console.error("Error normalizing property:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={handleNormalize}>Normalize Property</button>
      {property && (
        <PropertyCard
          property={property}
          onUpdate={(vf: VolumeFolio) =>
            setProperty({ ...property, volumeFolio: vf })
          }
        />
      )}
    </div>
  );
};

export default App;
