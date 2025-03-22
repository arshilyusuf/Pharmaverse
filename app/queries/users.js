import User from "../models/userModel";

export async function createUser(user) {
  console.log("Creating user: ",user)
  try {
    await User.create(user);
  } catch (err) {
    console.log(err);
  }
}
