"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import ArrowSVG from "@/assets/arrow.svg";
import Link from "next/link";
import Toast from "./Toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setSubmissionStatus("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://rsvp-rust.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSubmissionStatus("Form submitted successfully!");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        setIsAuthenticated(true);
      } else {
        const errorData = await response.json();
        setSubmissionStatus(errorData.message || "Failed to submit the form.");
      }
    } catch (error) {
      setSubmissionStatus("An error occurred. Please try again.");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch(
        "https://rsvp-rust.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "bu@bu.de",
            password: "123123123!",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        setIsAuthenticated(true);
        setSubmissionStatus("Logged in as guest.");
      } else {
        const errorData = await response.json();
        setSubmissionStatus(errorData.message || "Guest login failed.");
      }
    } catch (error) {
      setSubmissionStatus("An error occurred during guest login.");
    }
  };

  useEffect(() => {
    if (submissionStatus) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setSubmissionStatus(""), 500);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [submissionStatus]);

  return (
    <>
      {submissionStatus && (
        <Toast isVisible={isVisible} status={submissionStatus} />
      )}
      <Link
        className="absolute m-5 flex gap-1 font-bold items-center group w-max rounded-[18px] transition-all duration-500"
        href="/"
      >
        <ArrowSVG className=" rounded-full  group-hover:p-1 group-hover:text-black" />
        <p className="text-gray-100 relative text-transparent group-hover:text-black translate-x-16 group-hover:translate-x-0 group-hover:block transition-all">
          Go back
        </p>
      </Link>
      <div className="flex flex-col w-full md:w-1/2 items-center md:items-start md:h-full justify-center p-8 md:p-16 gap-4">
        <Link
          title="Home"
          className="font-extrabold gap-2 capitalize inline-flex text-xl items-center text-primary font-poppins"
          href="/"
        >
          <span className="">Event app</span>
        </Link>
        <h2 className="text-3xl font-bold">Log in</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-neutral-500">Email</label>
            <div className="p-2 px-1 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inline-flex rounded-[18px] font-poppins">
              <input
                type="email"
                placeholder="example@email.com"
                className="p-2 w-full bg-transparent focus:outline-none disabled:text-neutral-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 ">
            <label className="text-sm mb-2 text-neutral-500">Password</label>
            <div className="flex p-2 px-1 pr-2 border border-neutral-300 focus-within:border-neutral-400 bg-transparent w-full inl3ine-flex rounded-[18px] font-poppins">
              <input
                type="password"
                placeholder="Enter your password"
                className="p-2  w-full bg-transparent focus:outline-none disabled:text-neutral-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z"></path>
                  <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"></path>
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="p-4 text-white text-center text-lg rounded-[18px] bg-black w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 my-8"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="p-4 text-black border border-black text-center text-lg rounded-[18px] bg-white w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
          >
            Continue as Guest
          </button>
        </form>
        <p>
          Don&apos;t have an account? Sign up{" "}
          <Link className="underline text-primary" href="/signup">
            here
          </Link>
        </p>
      </div>
    </>
  );
}
