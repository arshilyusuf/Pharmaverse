import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
export default function UserItem({ user, onDelete}) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${user._id}`, {
          method: "DELETE",
        });
        onDelete(user._id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  return (
    <div className="bg-[var(--background)] p-4 rounded-2xl flex justify-between text-[var(--font-nav)]">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-[900] flex items-center gap-5">
          {user.name}{" "}
          {user.role === "admin" && (
            <AdminPanelSettingsIcon style={{ fontSize: "3rem" }} />
          )}
          {user.role === "user" && (
            <AccountCircleIcon style={{ fontSize: "3rem" }} />
          )}
          {user.role === "vendor" && (
            <EngineeringIcon style={{ fontSize: "3rem" }} />
          )}
        </h2>
        {(user.role === "vendor" || user.role === "admin") && (
          <p className="text-lg text-[var(--text)]">
            Registration Number: {user.registrationNumber}
          </p>
        )}
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <button
        className="bg-red-800 text-white px-4 py-2 h-fit rounded-xl font-semibold"
        onClick={handleDelete}
      >
        REMOVE
      </button>
    </div>
  );
}
