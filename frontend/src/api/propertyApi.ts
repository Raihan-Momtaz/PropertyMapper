import axios from "axios"; 
// Import Axios for making HTTP requests to the backend API

import type { ExternalProperty, InternalProperty, VolumeFolio } from "../types"; 
// Import TypeScript types for type-checking:
// - ExternalProperty: the structure of property data from external source
// - InternalProperty: structure of property stored in backend
// - VolumeFolio: structure for volume/folio updates

// -------------------------
// Type for API response from normalize endpoint
// -------------------------
export type NormalizeResponse = {
  id: string;               // ID assigned to the normalized property
  property: InternalProperty; // The normalized property object
};

// -------------------------
// POST normalizeProperty
// -------------------------
// Sends an external property to the backend to convert/normalize it
export const normalizeProperty = async (
  property: ExternalProperty
): Promise<NormalizeResponse> => {
  const res = await axios.post<NormalizeResponse>(
    "http://localhost:5070/api/property/normalize", // Backend endpoint
    property                                       // POST body contains the property data
  );
  return res.data; // Return the backend response (id + normalized property)
};

// -------------------------
// PATCH updateVolumeFolio
// -------------------------
// Updates the volume and folio of an existing property
export const updateVolumeFolio = async (
  id: string,         // ID of the property to update
  vf: VolumeFolio     // Object containing { volume, folio }
): Promise<InternalProperty> => {
  const res = await axios.patch<InternalProperty>(
    `http://localhost:5070/api/property/${id}`, // PATCH endpoint for specific property
    vf                                         // Request body with volume/folio
  );
  return res.data; // Return the updated property from backend
};

// -------------------------
// GET getPropertyById
// -------------------------
// Fetch a property by its ID
export const getPropertyById = async (id: string): Promise<InternalProperty> => {
  const res = await axios.get<InternalProperty>(
    `http://localhost:5070/api/property/${id}` // GET endpoint for a specific property
  );
  return res.data; // Return the property from backend
};
