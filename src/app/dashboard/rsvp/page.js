"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function Rsvp() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold">RSVP</h2>
        <div className="h-full w-full flex justify-center ">test</div>
      </div>
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}
