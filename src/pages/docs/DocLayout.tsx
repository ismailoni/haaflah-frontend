import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DocLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DocLayout;
