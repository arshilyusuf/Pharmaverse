"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddSupplyOrderForm({ onClose, onOrderAdded }) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    drugID: "",
    quantity: "",
    suppliedTo: "",
    vendorID: "",
    orderDate: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const validateDrugID = async (drugID) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drugs/${drugID}`);
      if (!res.ok) {
        throw new Error("Invalid Drug ID");
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Check if session exists
    if (!session?.user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      // Validate drug ID
      const isDrugValid = await validateDrugID(formData.drugID);
      if (!isDrugValid) {
        setError("Invalid Drug ID");
        return;
      }
      // console.log(formData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplyorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          vendorID: session.user._id,
        }),
      });
      // console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to create supply order");
      }

      onOrderAdded();
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-[var(--background)] p-6 rounded-lg w-96 text-[var(--color-white)]">
        <h2 className="text-2xl font-bold mb-4">Add Supply Order</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-[var(--color-brown)]"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Drug ID</label>
            <input
              type="text"
              value={formData.drugID}
              onChange={(e) =>
                setFormData({ ...formData, drugID: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Supplied To
            </label>
            <input
              type="text"
              value={formData.suppliedTo}
              onChange={(e) =>
                setFormData({ ...formData, suppliedTo: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order Date</label>
            <input
              type="date"
              value={formData.orderDate}
              onChange={(e) =>
                setFormData({ ...formData, orderDate: e.target.value })
              }
              className="w-full p-2 border rounded bg-[var(--background-dark)]"
              required
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
              {loading ? "Adding..." : "Add Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
