import { connectDB } from "@/app/lib/db";
import SupplyOrder from "@/app/models/supplyOrderModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params; // Extract id from route parameters

    if (!id) {
      return NextResponse.json(
        { error: "Supply order ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const supplyOrder = await SupplyOrder.findById(id)
    if (!supplyOrder) {
      return NextResponse.json({ error: "Supply order not found" }, { status: 404 });
    }

    return NextResponse.json(supplyOrder, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
  try {
    const { id } = params; // Extract id from route parameters

    if (!id) {
      return NextResponse.json(
        { error: "Supply order ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedOrder = await SupplyOrder.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Supply order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Supply order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


