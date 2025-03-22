"use client";
import { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import HashLoader from "react-spinners/HashLoader";

function LoadingContent({ setLoading }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Minimum loading time
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return null;
}

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Suspense fallback={null}>
        <LoadingContent setLoading={setLoading} />
      </Suspense>
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#4c4c4c" />
        </div>
      )}
      {children}
    </>
  );
}
