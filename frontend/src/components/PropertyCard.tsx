import React, { useState, useEffect } from "react"; 
// Import React and hooks:
// - useState: to store and update state variables (volume, folio, modal open, errors)
// - useEffect: to run side-effects (e.g., set up modal or update inputs when modal opens)

import Modal from "react-modal"; 
// Import react-modal library for displaying the modal popup

import type { InternalProperty, VolumeFolio } from "../types"; 
// Import TypeScript types:
// - InternalProperty: the shape of the property object
// - VolumeFolio: type for the volume/folio update

// Define the props type for this component
type Props = {
  property: InternalProperty; // The property data to display in this card
  onUpdate: (vf: VolumeFolio) => void; // Callback function when volume/folio is updated
};

const PropertyCard: React.FC<Props> = ({ property, onUpdate }) => {
  // -------------------------
  // State variables
  // -------------------------
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // Tracks whether the modal popup is open

  const [volume, setVolume] = useState(property.volumeFolio.volume || ""); 
  // Stores the current volume input value. Defaults to existing property volume or empty string

  const [folio, setFolio] = useState(property.volumeFolio.folio || ""); 
  // Stores the current folio input value. Defaults to existing property folio or empty string

  const [errors, setErrors] = useState<{ volume?: string; folio?: string }>({}); 
  // Stores validation errors for volume and folio

  // -------------------------
  // Set up react-modal
  // -------------------------
  useEffect(() => {
    // react-modal requires setting the root app element for accessibility (screen readers)
    if (typeof document !== "undefined") {
      Modal.setAppElement("#root");
    }
  }, []);

  // -------------------------
  // Reset modal inputs when modal opens
  // -------------------------
  useEffect(() => {
    if (isModalOpen) {
      // Reset the input fields to the latest property values whenever modal opens
      setVolume(property.volumeFolio.volume || "");
      setFolio(property.volumeFolio.folio || "");
      setErrors({}); // Clear any previous errors
    }
  }, [isModalOpen, property]); 
  // Dependency array ensures this runs when modal opens or property changes

  // -------------------------
  // Functions to open/close modal
  // -------------------------
  const openModal = () => setIsModalOpen(true); // Open modal
  const closeModal = () => setIsModalOpen(false); // Close modal

  // -------------------------
  // Function to validate inputs and update property
  // -------------------------
  const handleConfirm = () => {
    const newErrors: typeof errors = {}; // Temporary object to collect validation errors

    // Validate volume: must be 1-6 digits
    if (!/^\d{1,6}$/.test(volume)) newErrors.volume = "Volume must be 1-6 digits";

    // Validate folio: must be 1-5 digits
    if (!/^\d{1,5}$/.test(folio)) newErrors.folio = "Folio must be 1-5 digits";

    // If there are errors, set them in state and do not proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, call the parent onUpdate function
    onUpdate({ volume, folio });

    // Close the modal
    closeModal();
  };

  // -------------------------
  // JSX to render the property card
  // -------------------------
  return (
    <div
      className="property-card"
      style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
    >
      {/* Display property address */}
      <h3>{property.fullAddress}</h3>

      {/* Display lot and plan if available */}
      {property.lotPlan && (
        <p>
          Lot/Plan: {property.lotPlan.lot} / {property.lotPlan.plan}
        </p>
      )}

      {/* Display current volume/folio */}
      <p>
        Volume/Folio: {property.volumeFolio.volume || "-"} / {property.volumeFolio.folio || "-"}
      </p>

      {/* Display property status */}
      <p>Status: {property.status}</p>

      {/* Button to open modal */}
      <button onClick={openModal}>Edit Volume/Folio</button>

      {/* Modal popup for editing volume/folio */}
      <Modal
        isOpen={isModalOpen} // Controlled by state
        onRequestClose={closeModal} // Allow closing on overlay click or ESC
        contentLabel="Edit Volume/Folio"
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        {/* Modal content container */}
        <div className="edit-modal">
          {/* Modal heading */}
          <h2>Edit Volume/Folio</h2>

          {/* Volume input */}
          <label>
            Volume:
            <input
              value={volume} // Controlled input
              onChange={(e) => {
                // Only allow digits and max 6 characters
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                setVolume(val);
              }}
            />
            {/* Show error message if validation fails */}
            {errors.volume && <span style={{ color: "red" }}>{errors.volume}</span>}
          </label>

          {/* Folio input */}
          <label>
            Folio:
            <input
              value={folio} // Controlled input
              onChange={(e) => {
                // Only allow digits and max 5 characters
                const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                setFolio(val);
              }}
            />
            {/* Show error message if validation fails */}
            {errors.folio && <span style={{ color: "red" }}>{errors.folio}</span>}
          </label>

          <br />

          {/* Confirm button triggers validation and update */}
          <button onClick={handleConfirm}>Confirm</button>

          {/* Close button closes modal without saving */}
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyCard; 
// Export component for use in parent (App.tsx)
