import { connectDB } from "@/app/lib/db";
import { fetchDrugs } from "@/app/queries/drugs";
import { NextResponse } from "next/server";
import Drug from "@/app/models/drugModel";

export async function GET() {
  try {
    await connectDB();
    const { drugs } = await fetchDrugs();

    return NextResponse.json(drugs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, quantity, expiry, price } = body;

    if (!name || !quantity || !expiry || !price) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newDrug = new Drug({
      name,
      quantity,
      expiry,
      price,
    });

    const savedDrug = await newDrug.save();
    console.log("Drug saved:", savedDrug);

    return NextResponse.json(savedDrug, { status: 201 });
  } catch (error) {
    console.error("Error creating drug:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}