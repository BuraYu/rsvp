"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function CreateEvent() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="flex bg-gray-100">
      <Sidebar />
      create eve
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}
