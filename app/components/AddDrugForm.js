"use client";
import { useState } from "react";

export default function AddDrugForm({ onClose, onDrugAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    expiry: new Date().toISOString().split("T")[0],
    price: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/drugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create drug");
      }

      onDrugAdded(data);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--background)] p-6 rounded-lg w-96 text-[var(--font-nav)]">
        <h2 className="text-2xl font-bold mb-4">Add New Drug</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-[var(--foreground)]"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--font-nav)]">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--font-nav)]">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--font-nav)]">
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiry}
              onChange={(e) =>
                setFormData({ ...formData, expiry: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--font-nav)]">
              Price
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Adding..." : "Add Drug"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
