"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Minimum loading time
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#4c4c4c" />
        </div>
      )}
      {children}
    </>
  );
}
