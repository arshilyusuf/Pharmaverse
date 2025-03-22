import "@/app/globals.css";
import { useSession } from "next-auth/react";

export default function DbOrder({ order }) {
  const { data: session, status } = useSession();

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full flex flex-col gap-1 bg-[var(--foreground-light)] p-5">
      <p className="font-semibold text-2xl text-white">
        To: {order.suppliedTo}
      </p>
      {session?.user?.role === "vendor" && (
        <>
          <p className="text-white">Drug: {order.drugName}</p>
          <p className="text-white">Quantity: {order.quantity}</p>
          <p className="text-white">Date: {formatDate(order.orderDate)}</p>
          <p className="text-white">Status: {order.status}</p>
        </>
      )}
    </div>
  );
}
