import { BrowserRouter } from "react-router-dom";
import Navbar from "@/navigation/navbar.tsx";
import { Routing } from "@/navigation/routing";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full">
        <Navbar />
      </div>

      {/* Content below navbar with centered margin auto and padding */}
      <div className="w-full px-4 sm:px-8 md:px-16">
        <Routing />
      </div>
      <Toaster />
    </BrowserRouter>
  );
};
