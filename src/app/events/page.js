"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Events() {
  const [activeButton, setActiveButton] = useState("All");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [onlineEvents, setOnlineEvents] = useState([]);
  const [offlineEvents, setOfflineEvents] = useState([]);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (Array.isArray(data)) {
          setEvents(data);
          setFilteredEvents(data);
        } else {
          console.error("API did not return an array:", data);
          setEvents([]);
          setFilteredEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
        setFilteredEvents([]);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const separateEvents = (events) => {
      const online = events.filter((event) => event.medium === "Online");
      const offline = events.filter((event) => event.medium === "In Person");

      setOnlineEvents(online);
      setOfflineEvents(offline);
    };

    separateEvents(events);
  }, [events]);

  const handleButtonClick = (category) => {
    setActiveButton(category);

    if (category === "All") {
      setFilteredEvents(events);
      setOnlineEvents(events.filter((event) => event.medium === "Online"));
      setOfflineEvents(events.filter((event) => event.medium === "In Person"));
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
      setOnlineEvents(filtered.filter((event) => event.medium === "Online"));
      setOfflineEvents(
        filtered.filter((event) => event.medium === "In Person")
      );
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    return format(new Date(dateString), "dd MMMM yyyy");
  }

  const grabEventTypes = (inputData) => {
    const categories = inputData.map((ele) => ele.category);
    return ["All", ...new Set(categories)];
  };

  const eventTypes = grabEventTypes(events);

  const categoryColors = {
    Music: "bg-blue-100 text-blue-500",
    Games: "bg-green-100 text-green-500",
    Sports: "bg-yellow-100 text-yellow-500",
    Film: "bg-red-100 text-red-500",
    Literature: "bg-purple-100 text-purple-500",
    Technology: "bg-indigo-100 text-indigo-500",
    Food: "bg-orange-100 text-orange-500",
    Education: "bg-teal-100 text-teal-500",
    Entertainment: "bg-pink-100 text-pink-500",
    Art: "bg-rose-100 text-rose-500",
    Wellness: "bg-emerald-100 text-emerald-500",
  };

  const getCategoryColor = (category) =>
    categoryColors[category] || "bg-gray-100 text-gray-500";

  return (
    <div className="bg-gray-100">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="container py-2 px-5 mx-auto min-h-screen bg-gray-100 w-full">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold mb-6 py-5">
            Explore events near your area
          </h1>

          {/* Category Selection */}
          <div className="flex gap-4 mb-8 items-center overflow-auto text-neutral-500">
            {eventTypes.map((category) => (
              <button
                key={category}
                onClick={() => handleButtonClick(category)}
                className={`cursor-pointer text-sm ${
                  activeButton === category ? "text-red-500" : "text-zinc-400"
                } rounded hover:text-red-500`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* All events */}
          <h2 className="text-3xl font-bold mb-3">All Events</h2>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="relative w-full mb-10"
          >
            <div className="absolute -top-6 right-15 z-10 flex space-x-2">
              <CarouselPrevious className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
              <CarouselNext className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </div>

            <CarouselContent className="flex gap-4 px-2">
              {filteredEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-shrink-0 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <a
                    href={`/events/${event._id}`}
                    className="w-full md:w-[85%] no-underline"
                  >
                    <Card className="w-full h-full shadow-md hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden">
                      <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="w-full h-48 bg-gray-300 rounded-md overflow-hidden mb-4">
                          <Image
                            src="https://picsum.photos/350/250"
                            width={350}
                            height={250}
                            alt="Event"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col mb-4">
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-gray-900 transition-all duration-300">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500 tracking-wide">
                            {event.startDate
                              ? formatDate(event.startDate)
                              : "TBA"}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                          <span
                            className={`inline-block text-xs font-medium rounded-md px-3 py-1 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                          <span className="text-xs text-gray-400 italic">
                            {event.createdBy}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Offline Events */}
          <h2 className="text-3xl font-bold mb-3">Offline Events</h2>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="relative w-full mb-10"
          >
            <div className="absolute -top-6 right-15 z-10 flex space-x-2">
              <CarouselPrevious className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
              <CarouselNext className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </div>

            <CarouselContent className="flex gap-4 px-2">
              {offlineEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-shrink-0 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <a
                    href={`/events/${event._id}`}
                    className="w-full md:w-[85%] no-underline"
                  >
                    <Card className="w-full h-full shadow-md hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden">
                      <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="w-full h-48 bg-gray-300 rounded-md overflow-hidden mb-4">
                          <Image
                            src="https://picsum.photos/350/250"
                            width={350}
                            height={250}
                            alt="Event"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col mb-4">
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-gray-900 transition-all duration-300">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500 tracking-wide">
                            {event.startDate
                              ? formatDate(event.startDate)
                              : "TBA"}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                          <span
                            className={`inline-block text-xs font-medium rounded-md px-3 py-1 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                          <span className="text-xs text-gray-400 italic">
                            {event.createdBy}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Online Events */}
          <h2 className="text-3xl font-bold mb-3">Online Events</h2>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="relative w-full"
          >
            <div className="absolute -top-6 right-15 z-10 flex space-x-2">
              <CarouselPrevious className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
              <CarouselNext className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </div>

            <CarouselContent className="flex gap-4 px-2">
              {onlineEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-shrink-0 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <a
                    href={`/events/${event._id}`}
                    className="w-full md:w-[85%] no-underline"
                  >
                    <Card className="w-full h-full shadow-md hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden">
                      <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="w-full h-48 bg-gray-300 rounded-md overflow-hidden mb-4">
                          <Image
                            src="https://picsum.photos/350/250"
                            width={350}
                            height={250}
                            alt="Event"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col mb-4">
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-gray-900 transition-all duration-300">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500 tracking-wide">
                            {event.startDate
                              ? formatDate(event.startDate)
                              : "TBA"}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                          <span
                            className={`inline-block text-xs font-medium rounded-md px-3 py-1 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                          <span className="text-xs text-gray-400 italic">
                            {event.createdBy}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
