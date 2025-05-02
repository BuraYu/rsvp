"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "@/lib/logout";
import Image from "next/image";

import {
  HomeIcon,
  CalendarIcon,
  PlusCircleIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const sidebarItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: "Events",
    path: "/dashboard/events",
    icon: <CalendarIcon className="h-5 w-5" />,
  },
  {
    name: "Create Event",
    path: "/dashboard/createEvent",
    icon: <PlusCircleIcon className="h-5 w-5" />,
  },
  {
    name: "RSVPs",
    path: "/dashboard/rsvp",
    icon: <UsersIcon className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const [pathname, setPathname] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const handleLogout = () => logout();
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow border border-gray-200"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 h-full w-64 bg-gray-100 text-gray-800 flex flex-col justify-between border-r border-neutral-200 z-40
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:flex
  `}
      >
        <div>
          <div className="p-4 flex justify-center font-bold ">
            {" "}
            <Image
              src="/assets/flockr_logo.png"
              width={75}
              height={75}
              alt="logo of flockr"
            />
          </div>
          <nav className="mt-4">
            <ul className="p-4">
              {sidebarItems.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link href={item.path} onClick={() => setIsOpen(false)}>
                    <div
                      className={`flex items-center px-5 py-2 rounded-lg cursor-pointer ${
                        pathname === item.path
                          ? "bg-gray-200 text-gray-700"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-300">
          <button
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
