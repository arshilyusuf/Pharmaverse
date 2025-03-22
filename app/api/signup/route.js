import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser } from "@/app/queries/users";
// import { signIn } from "@/app/lib/auth";
// import Router from "next/router";

export const POST = async (request) => {
  const { name, email, password, role, phone,registrationNumber } =
    await request.json();

  console.log(name, email, password, phone, role, registrationNumber);

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    registrationNumber,
  };
  try {
    await createUser(newUser);
    console.log("User created Successfully");
    // const signInResponse = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });

    // if (signInResponse?.error) {
    //   return NextResponse.json(
    //     { error: "Authentication failed after signup" },
    //     { status: 401 }
    //   );
    // }
  } catch (err) {
    console.log(err);
    throw new NextResponse(err.message, 500);
  }
  return NextResponse.json(
    { message: "User has been created" },
    { status: 201 }
  );
};
