"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function DrugItem({
  id,
  name,
  expiry,
  quantity,
  price,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDrug, setEditedDrug] = useState({
    name,
    expiry,
    quantity,
    price,
  });
  const { data: session } = useSession();

  const handleEdit = async () => {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/drugs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDrug),
      });
      console.log("request made to: ", `${process.env.NEXTAUTH_URL}/api/drugs/${id}`);
      console.log("response", response);

      if (!response.ok) throw new Error("Failed to update drug");

      const updatedDrug = await response.json();
      onUpdate(updatedDrug);

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating drug:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this drug?")) {
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/drugs/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete drug");
        onDelete(id);
      } catch (error) {
        console.error("Error deleting drug:", error);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-[var(--background)] p-4 rounded-lg shadow text-[var(--font-nav)]">
        <input
          type="text"
          value={editedDrug.name}
          onChange={(e) =>
            setEditedDrug({ ...editedDrug, name: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="date"
          value={new Date(editedDrug.expiry).toISOString().split("T")[0]}
          onChange={(e) =>
            setEditedDrug({ ...editedDrug, expiry: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          value={editedDrug.quantity}
          onChange={(e) =>
            setEditedDrug({ ...editedDrug, quantity: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          step="0.01"
          value={editedDrug.price}
          onChange={(e) =>
            setEditedDrug({ ...editedDrug, price: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] p-4 shadow flex justify-between items-center text-[var(--font-nav)]">
      <div>
        <h3 className="font-bold text-4xl">{name}</h3>
        <p className="font-medium">Expiry: {expiry}</p>
        <p>Quantity: {quantity}</p>
        <p>Price: ${price}</p>
      </div>
      {session?.user?.role === "admin" && (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-xl bg-blue-500 text-white rounded-xl"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-xl bg-red-700 text-white rounded-xl"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
