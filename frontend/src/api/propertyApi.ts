import axios from "axios";
import type { ExternalProperty, InternalProperty } from "../types";

export const normalizeProperty = async (
  property: ExternalProperty
): Promise<InternalProperty> => {
  const res = await axios.post<InternalProperty>(
    "http://localhost:5070/api/property/normalize",
    property
  );
  return res.data;
};
