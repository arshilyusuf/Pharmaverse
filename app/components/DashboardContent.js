"use client";
import { useSession } from "next-auth/react";
import SupplyOrderChart from "./SupplyOrderChart";
import ConsumptionChart from "./ConsumptionChart";
import DbOrder from "./DbOrder";
import Loader from "./Loader";

export default function DashboardContent({ supplyOrders }) {
  const { data: session, status } = useSession();
  const firstFiveOrders = supplyOrders.slice(0, 5);

  if (status === "loading") {
    return <div><Loader/></div>;
  }
  if(session?.user?.role === "user") {
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[100%] max-[412px]:grid-cols-1 max-[412px]:grid-rows-3">
        <div className="bg-[var(--foreground)] col-span-3 row-span-1 rounded-3xl px-6 py-4 max-[412px]:py-2 pb-6 text-2xl flex flex-col gap-4 max-[412px]:gap-4 max-[412px]:h-100">
          <p className="text-white">Supply Orders</p>
          <div className="bg-[var(--background)] h-full max-[412px]:h-[80%] rounded-2xl">
            <SupplyOrderChart data={supplyOrders} />
          </div>
        </div>
        <div className="bg-[var(--foreground)] col-span-3 max-[412px]:col-span-3 row-span-1 rounded-3xl px-6 py-4 pb-6 text-2xl flex flex-col gap-4 max-[412px]:h-100">
          <p className="text-white">Consumption</p>
          <div className="bg-[var(--background)] h-full max-[412px]:h-[80%] rounded-2xl">
            <ConsumptionChart />
          </div>
        </div>
      </div>
    );
  }
  if(session?.user?.role === "vendor") {
      return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[100%] max-[412px]:grid-cols-1 max-[412px]:grid-rows-3">
          <div className="bg-[var(--foreground)] col-span-3 row-span-1 rounded-3xl px-6 py-4 max-[412px]:py-2 pb-6 text-2xl flex flex-col gap-4 max-[412px]:gap-4 max-[412px]:h-100">
            <p className="text-white">Supply Orders</p>
            <div className="bg-[var(--background)] h-full max-[412px]:h-[80%] rounded-2xl">
              <SupplyOrderChart data={supplyOrders} />
            </div>
          </div>
          <div className="bg-[var(--foreground)] col-span-3 max-[412px]:col-span-3 row-span-1 rounded-3xl py-4 pb-0 text-2xl flex flex-col gap-4 overflow-hidden max-[412px]:h-100">
            <p className="text-white ml-6">Orders</p>
            <ul className="flex flex-col gap-4 w-full overflow-y-auto max-h-full">
              {firstFiveOrders.map((order) => (
                <li key={order._id}>
                  <DbOrder order={order} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[100%] max-[412px]:grid-cols-1 max-[412px]:grid-rows-3">
      <div className="bg-[var(--foreground)] col-span-3 row-span-1 rounded-3xl px-6 py-4 max-[412px]:py-2 pb-6 text-2xl flex flex-col gap-4 max-[412px]:gap-4 max-[412px]:h-100">
        <p className="text-white">Supply Orders</p>
        <div className="bg-[var(--background)] h-full max-[412px]:h-[80%] rounded-2xl">
          <SupplyOrderChart data={supplyOrders} />
        </div>
      </div>
      <div className="bg-[var(--foreground)] col-span-2 max-[412px]:col-span-3 row-span-1 rounded-3xl px-6 py-4 pb-6 text-2xl flex flex-col gap-4 max-[412px]:h-100">
        <p className="text-white">Consumption</p>
        <div className="bg-[var(--background)] h-full max-[412px]:h-[80%] rounded-2xl">
          <ConsumptionChart />
        </div>
      </div>
      <div className="bg-[var(--foreground)] col-span-1 max-[412px]:col-span-3 row-span-1 rounded-3xl py-4 pb-0 text-2xl flex flex-col gap-4 overflow-hidden max-[412px]:h-100">
        <p className="text-white ml-6">Orders</p>
        <ul className="flex flex-col gap-4 w-full overflow-y-auto max-h-full">
          {firstFiveOrders.map((order) => (
            <li key={order._id}>
              <DbOrder order={order} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
