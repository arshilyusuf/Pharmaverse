import SupplyOrder from "@/app/models/supplyOrderModel";

export async function fetchOrders() {
  try {
    const orders = await SupplyOrder.find({}).sort({ name: 1 }).select("-__v");

    return { orders };
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw new Error("Failed to fetch drugs");
  }
}
