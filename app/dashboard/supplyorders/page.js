"use client";
import { useEffect, useState } from "react";
import OrderItem from "@/app/components/OrderItem";
import AddIcon from "@mui/icons-material/Add";
import AddSupplyOrderForm from "@/app/components/AddSupplyOrderForm";
import { useSession } from "next-auth/react";
import Loader from "@/app/components/Loader";
async function fetchSupplyOrders() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}supplyorders`, {
      cache: "no-store", // For real-time data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supply orders");
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default function Page() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const getSupplyOrders = async () => {
    const ordersData = await fetchSupplyOrders();
    setOrders(ordersData);
    setLoading(false);
  };
  useEffect(() => {
    getSupplyOrders();
  }, []);

  const handleDelete = async () => {
    await getSupplyOrders();
  };
  if (loading) {
    return <Loader/>
  }

  return (
    <div className="h-full w-full text-[var(--foreground)] bg-[var(--foreground)] rounded-3xl py-4 pb-6 text-2xl flex flex-col gap-4">
      <div className="px-6 text-white flex items-center justify-between">
        Supply Orders{" "}
        {session?.user?.role !== "user" && (
          <button onClick={() => setShowAddForm(true)}>
            <AddIcon style={{ fontSize: "2rem", fontWeight: "bold" }} />
          </button>
        )}
        
      </div>
      <ul className="flex flex-col gap-4 max-h-full overflow-y-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order._id}>
              <OrderItem order={order} onDelete={handleDelete} />
            </li>
          ))
        ) : (
          <li className="text-center text-white">No supply orders found</li>
        )}
      </ul>
      {showAddForm && (
        <AddSupplyOrderForm
          onClose={() => setShowAddForm(false)}
          onOrderAdded={getSupplyOrders}
        />
      )}
    </div>
  );
}
