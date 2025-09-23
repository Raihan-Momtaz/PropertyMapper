// -------------------------
// LotPlan type
// -------------------------
// Represents the lot and plan numbers of a property
export type LotPlan = {
  lot?: string;   // Optional lot number
  plan?: string;  // Optional plan number
};

// -------------------------
// VolumeFolio type
// -------------------------
// Stores the volume and folio details of a property
export type VolumeFolio = {
  volume: string | null; // Volume number (can be null if unknown)
  folio: string | null;  // Folio number (can be null if unknown)
};

// -------------------------
// SourceTrace type
// -------------------------
// Tracks the origin of the property data
export type SourceTrace = {
  provider?: string;   // Name of the data provider
  requestId?: string;  // ID of the request used to fetch the data
  receivedAt?: string; // Timestamp when data was received
};

// -------------------------
// InternalProperty type
// -------------------------
// Represents a property as stored in your system (after normalization)
export type InternalProperty = {
  fullAddress: string;        // Full formatted address of the property
  lotPlan?: LotPlan;          // Optional lot/plan info
  volumeFolio: VolumeFolio;   // Volume and folio info
  status: "KnownVolFol" | "UnknownVolFol"; // Whether volume/folio is known
  sourceTrace: SourceTrace;   // Tracks where the data came from
};

// -------------------------
// Title type
// -------------------------
// Represents volume/folio from an external property title
export type Title = {
  volume?: string; // Optional volume
  folio?: string;  // Optional folio
};

// -------------------------
// AddressParts type
// -------------------------
// Optional breakdown of a property address
export type AddressParts = {
  street?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
};

// -------------------------
// ExtraData type
// -------------------------
// Additional optional metadata for a property
export type ExtraData = {
  notes?: string;   // Optional notes about the property
  tags?: string[];  // Optional tags for categorization
};

// -------------------------
// ExternalProperty type
// -------------------------
// Represents a property from an external source, before normalization
export type ExternalProperty = {
  provider?: string;           // Name of external provider
  requestId?: string;          // Request ID
  receivedAt?: string;         // Timestamp received
  addressParts?: AddressParts; // Optional address breakdown
  formattedAddress?: string;   // Full formatted address
  lotPlan?: LotPlan;           // Optional lot/plan
  title?: Title;               // Optional title (volume/folio)
  extra?: ExtraData;           // Optional extra metadata
};
