"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { doCredentialLogin, doSocialLogin } from "../actions";
import Loader from "../components/Loader";
import { HashLoader } from "react-spinners";
export default function Page() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const Router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("event", event);
    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialLogin(formData);
      console.log("response", response);
      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        window.location.href = "/dashboard"; // This will cause a full page reload
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <HashLoader color="#4c4c4c" />
      </div>
    );
  }
  return (
    <div className="h-fit p-16 flex items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="h-full bg-[var(--foreground)] text-[var(--color-white)] rounded-4xl p-16 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              // value={formData.email}
              // onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--font-nav)]"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              // value={formData.password}
              // onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--font-nav)]"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            {`Don't have an account? `}
            <a href="/signup" className="text-white hover:text-blue-300">
              Sign up
            </a>
          </p>
          <div className="border-1 border-[var(--color-white)] mt-4 mb-4"></div>
          <form className="flex" action={doSocialLogin}>
            <button
              type="submit"
              className="bg-gray-200 hover:bg-gray-300 text-black p-3 rounded-lg font-semibold w-full"
              name="action"
              value="google"
            >
              Login with <span className="font-bold">Google</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
