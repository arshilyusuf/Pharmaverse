import { connectDB } from "@/app/lib/db";
import Drug from "@/app/models/drugModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params; 

    if (!id) {
      return NextResponse.json(
        { error: "Drug ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const drug = await Drug.findById(id);

    if (!drug) {
      return NextResponse.json({ error: "Drug not found" }, { status: 404 });
    }

    return NextResponse.json(drug, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PUT(request, { params }) {
  try {
    console.log("PUT request made");
    const { id } = params; 
    console.log("ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Drug ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const updates = await request.json();

    const updatedDrug = await Drug.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!updatedDrug) {
      return NextResponse.json({ error: "Drug not found" }, { status: 404 });
    }

    return NextResponse.json(updatedDrug);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // ✅ Extract id from route parameters

    if (!id) {
      return NextResponse.json(
        { error: "Drug ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedDrug = await Drug.findByIdAndDelete(id);

    if (!deletedDrug) {
      return NextResponse.json({ error: "Drug not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Drug deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
