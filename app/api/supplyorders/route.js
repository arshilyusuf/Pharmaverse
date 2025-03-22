import { connectDB } from "@/app/lib/db";
import { fetchOrders } from "@/app/queries/supplyorders";
import { NextResponse } from "next/server";
import SupplyOrder from "@/app/models/supplyOrderModel";
export async function GET() {
  try {
    await connectDB();
    const { orders } = await fetchOrders();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { drugID, quantity, suppliedTo, vendorID, orderDate } =
      await request.json();
   
    // Create a new supply order
    const newOrder = new SupplyOrder({
      drugID,
      quantity,
      suppliedTo,
      vendorID,
      orderDate,
    });
    // console.log("New Order: ", newOrder);
    // Save the new supply order to the database
    await newOrder.save();
    // console.log("New Order saved")
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}