
import DashboardContent from "../components/DashboardContent";

async function fetchSupplyOrders() {
   try {
     const res = await fetch("http://localhost:3000/api/supplyorders", {
       cache: "no-store", 
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

export default async function Page() {
  const supplyOrders = await fetchSupplyOrders();

  return <DashboardContent supplyOrders={supplyOrders} />;
}


