"use client";
import "@/app/globals.css";
// import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export default function OrderItem({ order, onDelete }) {
  const { data: session } = useSession();
  // console.log(order)
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this supply order?")) {
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/supplyorders/${order._id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete supply order");

        onDelete(order._id);
      } catch (error) {
        console.error("Error deleting supply order:", error);
      }
    }
  };

  const getStatusButtonClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-700 hover:bg-yellow-800";
      case "delivered":
        return "bg-green-500 hover:bg-green-700";
      case "cancelled":
        return "bg-red-800 hover:bg-red-700";
      default:
        return "bg-gray-500 hover:bg-gray-700";
    }
  };

  return (
    <div className="flex justify-between bg-[var(--background)] px-6 py-3 text-[var(--font-nav)]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-evenly">
          <h2 className="font-black text-3xl ">{order.drugName}</h2>
          <p className="text-2xl font-semibold">
            Supplied to: {order.suppliedTo}
          </p>
          <p className="text-xl font-medium">
            Vendor Registration Number: {order.vendorRegistrationNumber}
          </p>
          <p className="text-xl font-medium">
            {new Date(order.orderDate).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <button className="bg-[var(--foreground-xlight)] text-white py-2 px-3 py-2 rounded-xl transition-colors text-[1rem] w-40">
          Quantity: {order.quantity}
        </button>
      </div>
      <div className="flex flex-col justify-between ">
        {session?.user?.role === "admin" && (
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 py-2 rounded-xl transition-colors h-fit "
          >
            <p className="text-[1rem]">Delete</p>
          </button>
        )}

        <button
          className={`${getStatusButtonClass(
            order.status
          )} text-white px-3 py-2 rounded-xl transition-colors text-[1rem] w-40`}
        >
          {order.status}
        </button>
      </div>
    </div>
  );
}
