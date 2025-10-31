import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
