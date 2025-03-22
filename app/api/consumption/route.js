import { connectDB } from "@/app/lib/db";
import SupplyOrder from "@/app/models/supplyOrderModel";
import Drug from "@/app/models/drugModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const supplyOrders = await SupplyOrder.find({});
    const drugs = await Drug.find({});

    const drugQuantities = {};

    supplyOrders.forEach((order) => {
      if (drugQuantities[order.drugID]) {
        drugQuantities[order.drugID] += order.quantity;
      } else {
        drugQuantities[order.drugID] = order.quantity;
      }
    });

    const response = drugs
      .filter((drug) => drugQuantities[drug._id])
      .map((drug) => ({
        drugName: drug.name,
        drugQuantity: drugQuantities[drug._id],
      }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
