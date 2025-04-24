"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  HomeIcon,
  CalendarIcon,
  PlusCircleIcon,
  UsersIcon,
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
  const router = useRouter();
  const [pathname, setPathname] = useState(null);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  if (!pathname) return null;

  return (
    <div className="h-screen w-64 bg-gray-100 text-gray-800 flex flex-col justify-between border-r border-neutral-200">
      <div>
        <div className="p-4 text-xl font-bold ">Event App</div>
        <nav className="mt-4">
          <ul className="p-4">
            {sidebarItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link href={item.path}>
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
          onClick={() => alert("Logging out...")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
