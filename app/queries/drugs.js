import Drug from "../models/drugModel";

export async function fetchDrugs() {
  try {
    const drugs = await Drug.find({}).sort({ name: 1 }).select("-__v");

    return { drugs };
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw new Error("Failed to fetch drugs");
  }
}
