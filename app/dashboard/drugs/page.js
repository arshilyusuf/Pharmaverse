"use client";
import DrugItem from "@/app/components/DrugItem";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddDrugForm from "@/app/components/AddDrugForm";
import { useSession } from "next-auth/react";
import Loader from "@/app/components/Loader";
async function getDrugs() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/drugs`, {
      cache: "no-store", // For real-time data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch drugs");
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default function Page() {
  const { data: session, status } = useSession();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  useEffect(() => {
    const fetchDrugs = async () => {
      const drugsData = await getDrugs();
      setDrugs(drugsData);
      setLoading(false);
    };

    fetchDrugs();
  }, []);

  const handleUpdate = async (updatedDrug) => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) =>
        drug._id === updatedDrug._id ? updatedDrug : drug
      )
    );
  };
const handleDrugAdded = (newDrug) => {
  setDrugs((prevDrugs) => [...prevDrugs, newDrug]);
};
  const handleDelete = async (deletedId) => {
    setDrugs((prevDrugs) => prevDrugs.filter((drug) => drug._id !== deletedId));
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="h-full w-full text-[var(--foreground)] bg-[var(--foreground)] rounded-3xl py-4 pb-6 text-2xl flex flex-col gap-4">
      <p className="px-6 text-white flex items-center justify-between">
        Drug Inventory
        {session?.user?.role !== "user" && (
          <button onClick={() => setShowAddForm(true)}>
            <AddIcon style={{ fontSize: "2rem", fontWeight: "bold" }} />
          </button>
        )}
      </p>
      <ul className="flex flex-col gap-4 max-h-full overflow-y-auto">
        {drugs.length > 0 ? (
          drugs.map((drug) => (
            <li key={drug._id}>
              <DrugItem
                name={drug.name}
                expiry={new Date(drug.expiry).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                quantity={drug.quantity}
                price={drug.price}
                id={drug._id}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </li>
          ))
        ) : (
          <li className="text-center text-white">No drugs found</li>
        )}
      </ul>
      {showAddForm && (
        <AddDrugForm
          onClose={() => setShowAddForm(false)}
          onDrugAdded={handleDrugAdded}
        />
      )}
    </div>
  );
}
