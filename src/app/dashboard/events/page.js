"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function Events() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold">Events</h2>
        <div className="flex justify-center h-[90%] bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full max-w-screen-xl">
            {/* Large box */}
            <div className="bg-blue-500 text-white rounded-2xl p-6 col-span-1 sm:col-span-2 row-span-2 flex items-center justify-center min-h-[200px]">
              Event name 1
            </div>

            {/* Medium boxes */}
            <div className="bg-pink-400 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 2
            </div>
            <div className="bg-green-400 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 3
            </div>
            <div className="bg-purple-500 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 4
            </div>
            <div className="bg-yellow-400 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 5
            </div>

            {/*  */}
            <div className="bg-teal-400 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 6
            </div>
            <div className="bg-orange-400 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 7
            </div>
            <div className="bg-red-400 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 9
            </div>
            <div className="bg-indigo-400 text-white rounded-2xl p-4 flex items-center justify-center min-h-[120px]">
            Event name 10
            </div>

            {/* Small long box */}
            <div className="bg-gray-700 text-white rounded-2xl p-4 sm:col-span-2 flex items-center justify-center min-h-[100px]">
            Event name 11
            </div>

            {/* Additional long box */}
            <div className="bg-blue-700 text-white rounded-2xl p-4 sm:col-span-2 flex items-center justify-center min-h-[100px]">
            Event name 12
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}
