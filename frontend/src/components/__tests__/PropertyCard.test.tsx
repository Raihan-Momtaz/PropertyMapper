import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PropertyCard from "../PropertyCard";
import type { InternalProperty } from "../../types";
import Modal from "react-modal";

// Mock react-modal to prevent setAppElement errors in Jest
Modal.setAppElement = () => {};

// Add a #root div for react-modal
beforeAll(() => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
});

describe("<PropertyCard />", () => {
  const mockProperty: InternalProperty = {
    fullAddress: "123 Main St",
    lotPlan: { lot: "10", plan: "LP123" },
    volumeFolio: { volume: "1234", folio: "56" },
    status: "KnownVolFol",
    sourceTrace: { provider: "TestProvider", requestId: "REQ001", receivedAt: "2025-09-23T00:00:00Z" },
  };

  const onUpdate = jest.fn();

  it("renders property info", () => {
    render(<PropertyCard property={mockProperty} onUpdate={onUpdate} />);
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
    expect(screen.getByText(/Lot\/Plan: 10 \/ LP123/)).toBeInTheDocument();
    expect(screen.getByText(/Volume\/Folio: 1234 \/ 56/)).toBeInTheDocument();
  });

it("opens and closes modal", () => {
  render(<PropertyCard property={mockProperty} onUpdate={onUpdate} />);
  
  // Click the button
  fireEvent.click(screen.getByRole("button", { name: "Edit Volume/Folio" }));
  
  // Check that modal heading is visible
  expect(screen.getByRole("heading", { name: "Edit Volume/Folio" })).toBeInTheDocument();
  
  fireEvent.click(screen.getByRole("button", { name: "Close" }));
});


  it("shows validation errors", () => {
    render(<PropertyCard property={mockProperty} onUpdate={onUpdate} />);
    fireEvent.click(screen.getByText("Edit Volume/Folio"));
    fireEvent.change(screen.getByLabelText("Volume:"), { target: { value: "abcdef" } });
    fireEvent.change(screen.getByLabelText("Folio:"), { target: { value: "123456" } });
    fireEvent.click(screen.getByText("Confirm"));
    expect(screen.getByText("Volume must be 1-6 digits")).toBeInTheDocument();
    expect(screen.getByText("Folio must be 1-5 digits")).toBeInTheDocument();
  });

  it("calls onUpdate on valid confirm", () => {
    render(<PropertyCard property={mockProperty} onUpdate={onUpdate} />);
    fireEvent.click(screen.getByText("Edit Volume/Folio"));
    fireEvent.change(screen.getByLabelText("Volume:"), { target: { value: "9999" } });
    fireEvent.change(screen.getByLabelText("Folio:"), { target: { value: "12" } });
    fireEvent.click(screen.getByText("Confirm"));
    expect(onUpdate).toHaveBeenCalledWith({ volume: "9999", folio: "12" });
  });
});
