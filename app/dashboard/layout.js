// app/dashboard/layout.js or wherever your layout is

import Sidebar from "../components/Sidebar"; // Import Sidebar component

export default function RootLayout({ children }) {
  return (
    
     
      <div className="h-[90vh] flex items-center max-[412px]:h-fit max-[412px]:px-3 gap-8 sm:pr-8 ">
        {/* Sidebar Component */}
        <Sidebar />

        <main className="w-full h-[90%] max-[412px]:h-fit max-[412px]:mt-1 max-[412px]:box-border">
          {children}
        </main>
      </div>
    
  );
}
