"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";

export default function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div>
      <h1>Welcome to the Dashboard</h1>
    </div>
  ) : (
    <h2>Please login to access</h2>
  );
}
