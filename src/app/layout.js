"use client";

import { useState, useEffect } from "react";
import { AuthContext } from "@/lib/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Checking for auth token in localStorage...");

    const token = localStorage.getItem("authToken");

    if (token) {
      console.log("Token found:", token);

      setIsAuthenticated(true);
    } else {
      console.log("No token found. User is not authenticated.");
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <html lang="en">
        <body>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          {children}
        </AuthContext.Provider>
      </body>
    </html>
  );
}
