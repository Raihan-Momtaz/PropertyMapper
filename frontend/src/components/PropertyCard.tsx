import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import type { InternalProperty, VolumeFolio } from "../types";

type Props = {
  property: InternalProperty;
  onUpdate: (vf: VolumeFolio) => void;
};

const PropertyCard: React.FC<Props> = ({ property, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volume, setVolume] = useState(property.volumeFolio.volume || "");
  const [folio, setFolio] = useState(property.volumeFolio.folio || "");
  const [errors, setErrors] = useState<{ volume?: string; folio?: string }>({});

  // Only set app element in browser
  useEffect(() => {
    if (typeof document !== "undefined") {
      Modal.setAppElement("#root");
    }
  }, []);

    useEffect(() => {
    if (isModalOpen) {
      setVolume(property.volumeFolio.volume || "");
      setFolio(property.volumeFolio.folio || "");
      setErrors({});
    }
  }, [isModalOpen, property]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    const newErrors: typeof errors = {};
    if (!/^\d{1,6}$/.test(volume)) newErrors.volume = "Volume must be 1-6 digits";
    if (!/^\d{1,5}$/.test(folio)) newErrors.folio = "Folio must be 1-5 digits";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdate({ volume, folio });
    closeModal();
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>{property.fullAddress}</h3>
      {property.lotPlan && <p>Lot/Plan: {property.lotPlan.lot} / {property.lotPlan.plan}</p>}
      <p>Volume/Folio: {property.volumeFolio.volume || "-"} / {property.volumeFolio.folio || "-"}</p>
      <p>Status: {property.status}</p>
      <button onClick={openModal}>Edit Volume/Folio</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Volume/Folio"
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        <h2>Edit Volume/Folio</h2>
        <label>
          Volume:
          <input value={volume} onChange={(e) => setVolume(e.target.value)} />
          {errors.volume && <span style={{ color: "red" }}>{errors.volume}</span>}
        </label>
        <br />
        <label>
          Folio:
          <input value={folio} onChange={(e) => setFolio(e.target.value)} />
          {errors.folio && <span style={{ color: "red" }}>{errors.folio}</span>}
        </label>
        <br />
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default PropertyCard;
