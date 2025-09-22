import axios from "axios";
import type { ExternalProperty, InternalProperty, VolumeFolio } from "../types";

// Backend returns { Id, Property }
export type NormalizeResponse = {
  id: string;
  property: InternalProperty;
};

// POST normalize
export const normalizeProperty = async (
  property: ExternalProperty
): Promise<NormalizeResponse> => {
  const res = await axios.post<NormalizeResponse>(
    "http://localhost:5070/api/property/normalize",
    property
  );
  return res.data;
};

// PATCH VolumeFolio
export const updateVolumeFolio = async (
  id: string,
  vf: VolumeFolio
): Promise<InternalProperty> => {
  const res = await axios.patch<InternalProperty>(
    `http://localhost:5070/api/property/${id}`,
    vf
  );
  return res.data;
};


// GET property by ID
export const getPropertyById = async (id: string): Promise<InternalProperty> => {
  const res = await axios.get<InternalProperty>(
    `http://localhost:5070/api/property/${id}`
  );
  return res.data;
};
