import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MongoDB URL not present in Env Variables");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  try{
      if(!cached.promise){
            cached.promise = mongoose.connect(MONGODB_URI)
      }
      cached.conn = await cached.promise;
      console.log("MongoDB Connected Successfully ✅")
      return cached.conn;
  }catch(error){
      console.log("Error Connecting to MongoDB", error)
      throw new Error("Couldn't connect to Mongo Data Base")
  }
}
