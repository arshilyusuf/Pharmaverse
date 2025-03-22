"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { HashLoader } from "react-spinners";
import { doLogOut } from "../actions";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleLogout = async (event) => {
    event.preventDefault();
    await doLogOut();
    window.location.href = "/";
  };
  // Comment out the old useEffect that fetched user data
  /*
  useEffect(() => {
    if (status === "loading") return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4c4c4c" />
      </div>
    );
    if (!session?.user?.email) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${session.user.email}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session, status]);
  */

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4c4c4c" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">No user data found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[var(--foreground-xlight)] text-white m-8 mt-0 mb-0 rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="h-full text-[var(--font-nav)]">
          <h2 className="text-4xl font-bold flex justify-between">
            {session.user.name}

            {session.user.role === "admin" && (
              <AdminPanelSettingsIcon style={{ fontSize: "4rem" }} />
            )}
            {session.user.role === "user" && (
              <AccountCircleIcon style={{ fontSize: "4rem" }} />
            )}
            {session.user.role === "vendor" && (
              <EngineeringIcon style={{ fontSize: "4rem" }} />
            )}
          </h2>
          <p className="text-2xl">{session.user.role.toUpperCase()}</p>
          <p className="text-xl">{session.user.email}</p>
          <p className="text-xl">{session.user.phone || "No Phone Provided"}</p>
        </div>
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="px-4 py-2 text-xl rounded-xl mt-5 hover:bg-red-800 hover:text-white transition-colors"
          >
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
}
