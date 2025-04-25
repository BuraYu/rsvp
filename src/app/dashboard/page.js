"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center justify-center min-h-screen">
          <div className="grid grid-flow-col gap-4">
            {/* Total Events Added */}
            <div className="bg-white shadow-md rounded-lg p-4 w-[300px] h-[200px] flex flex-col justify-center items-center">
              <p className="text-5xl font-semibold mb-2">2</p>
              <h3 className="text-lg font-semibold text-center">
                Total Events Added
              </h3>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 w-[300px] h-[200px] flex flex-col justify-center items-center">
              <p className="text-5xl font-semibold mb-2">22</p>
              <h3 className="text-lg font-semibold text-center">
                Public Events Added
              </h3>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 w-[300px] h-[200px] flex flex-col justify-center items-center">
              <p className="text-5xl font-semibold mb-2">12</p>
              <h3 className="text-lg font-semibold text-center">
                Private Events Added
              </h3>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 w-[300px] h-[200px] flex flex-col justify-center items-center">
              <p className="text-5xl font-semibold mb-2">13</p>
              <h3 className="text-lg font-semibold text-center">
                Total Attendees
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}
