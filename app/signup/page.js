"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    passwordConfirm: "",
    role: "user",
    registrationNumber: "",
    vendorVerificationKey: "",
    adminVerificationKey: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        name,
        email,
        password,
        phone,
        passwordConfirm,
        role,
        registrationNumber,
        vendorVerificationKey,
        adminVerificationKey,
      } = formData;

      if (password !== passwordConfirm) {
        throw new Error("Passwords do not match");
      }
      if (vendorVerificationKey && vendorVerificationKey !== "vendor@verificatoin$key") {
        throw new Error("Invalid Vendor Verification Key");
      }
      if (adminVerificationKey && adminVerificationKey !== "admin@verificatoin$key") {
        throw new Error("Invalid Admin Verification Key");
      }

      const response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          role,
          registrationNumber,
        }),
      });

      if (response.status === 201) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-fit p-16 flex items-center justify-center">
      <div className="h-full bg-[var(--foreground)] text-[var(--background)] rounded-4xl p-10 w-full max-w-md shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)] hover:text-gray-400 hover:font-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)] hover:text-gray-400 hover:font-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)] hover:text-gray-400 hover:font-black"
          />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)]"
            />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)] hover:text-gray-400 hover:font-black"
          />
          <div className="flex gap-4 justify-evenly w-full">
            <label
              className={`flex-1 px-3 py-2 rounded-xl text-center cursor-pointer ${
                formData.role === "user"
                  ? "bg-[var(--foreground-light)] text-white"
                  : "bg-[var(--background)] text-gray-900"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                className="hidden"
              />
              User
            </label>
            <label
              className={`flex-1 px-3 py-2 rounded-xl text-center cursor-pointer ${
                formData.role === "vendor"
                  ? "bg-[var(--foreground-light)] text-white"
                  : "bg-[var(--background)] text-gray-900"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="vendor"
                checked={formData.role === "vendor"}
                onChange={handleChange}
                className="hidden"
              />
              Vendor
            </label>
            <label
              className={`flex-1 px-3 py-2 rounded-xl text-center cursor-pointer ${
                formData.role === "admin"
                  ? "bg-[var(--foreground-light)] text-white"
                  : "bg-[var(--background)] text-gray-900"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                className="hidden"
              />
              Admin
            </label>
          </div>

          {(formData.role === "vendor" || formData.role === "admin") && (
            <>
              <input
                type="text"
                name="registrationNumber"
                placeholder="Registration Number"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)]"
              />
              {formData.role === "vendor" && (
                <input
                  type="text"
                  name="vendorVerificationKey"
                  placeholder="Vendor Verification Key"
                  value={formData.vendorVerificationKey}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)]"
                />
              )}
              {formData.role === "admin" && (
                <input
                  type="text"
                  name="adminVerificationKey"
                  placeholder="Admin Verification Key"
                  value={formData.adminVerificationKey}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-[var(--background)] text-[var(--foreground)]"
                />
              )}
            </>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:text-blue-300">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
