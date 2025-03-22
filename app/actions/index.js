"use server"
import { signIn, signOut } from "@/app/lib/auth";

export async function doCredentialLogin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect:false
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function doSocialLogin(formData) {
  console.log('doSocialLogin', formData);
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}

export async function doLogOut() {
  await signOut({ redirect: false });
  return { url: "/" }; 
}
