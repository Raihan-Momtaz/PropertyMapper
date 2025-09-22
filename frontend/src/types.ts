export type LotPlan = {
  lot?: string;
  plan?: string;
};

export type VolumeFolio = {
  volume: string | null;
  folio: string | null;
};

export type SourceTrace = {
  provider?: string;
  requestId?: string;
  receivedAt?: string;
};

export type InternalProperty = {
  fullAddress: string;
  lotPlan?: LotPlan;
  volumeFolio: VolumeFolio;
  status: "KnownVolFol" | "UnknownVolFol";
  sourceTrace: SourceTrace;
};

export type Title = {
  volume?: string;
  folio?: string;
};

export type AddressParts = {
  street?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
};

export type ExtraData = {
  notes?: string;
  tags?: string[];
};

export type ExternalProperty = {
  provider?: string;
  requestId?: string;
  receivedAt?: string;
  addressParts?: AddressParts;
  formattedAddress?: string;
  lotPlan?: LotPlan;
  title?: Title;
  extra?: ExtraData;
};
