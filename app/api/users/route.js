import User from "@/app/models/userModel";
import { connectDB } from "@/app/lib/db";

export async function GET(request) {
  try {
    await connectDB();
    const users = await User.find(); 

    if (!users) {
      return new Response("No users found", { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error retrieving users", { status: 500 });
  }
}
