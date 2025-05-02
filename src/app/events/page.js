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
  const [loaded, setLoaded] = useState(false);
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
      const offline = events.filter((event) => event.medium === "Offline");

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
      setOfflineEvents(events.filter((event) => event.medium === "Offline"));
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
      setOnlineEvents(filtered.filter((event) => event.medium === "Online"));
      setOfflineEvents(filtered.filter((event) => event.medium === "Offline"));
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
    Music: "bg-blue-100 text-blue-600",
    Games: "bg-green-100 text-green-600",
    Sports: "bg-yellow-100 text-yellow-600",
    Arts: "bg-pink-100 text-pink-600",
    Film: "bg-red-100 text-red-600",
    Literature: "bg-purple-100 text-purple-600",
    Technology: "bg-indigo-100 text-indigo-600",
    Culture: "bg-emerald-100 text-emerald-600",
    Lifestyle: "bg-teal-100 text-teal-600",
    Charity: "bg-rose-100 text-rose-600",
    Fashion: "bg-orange-100 text-orange-600",
    Kids: "bg-lime-100 text-lime-600",
    Webinar: "bg-lime-100 text-lime-600",
    Other: "bg-gray-100 text-gray-600",
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
                    <Card className="w-full h-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                      {/* Skeleton Layer */}
                      {!loaded && (
                        <div className="absolute inset-0 z-10 p-4 animate-pulse space-y-4 bg-white">
                          <div className="w-full h-48 bg-gray-200 rounded-md" />
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-100 rounded w-1/3 mt-4" />
                        </div>
                      )}

                      {/* Real Content */}
                      <div
                        className={`flex flex-col h-full relative transition-opacity duration-300 ${
                          loaded ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="relative mb-4">
                          <Image
                            src={event.image}
                            width={350}
                            height={250}
                            alt="Event"
                            className="rounded-md object-cover w-full h-48"
                            onLoad={() => setLoaded(true)}
                          />

                          {event.startDate &&
                            !isNaN(new Date(event.startDate)) && (
                              <div className="absolute top-2 right-2 bg-white shadow text-sm rounded text-center font-semibold px-2 py-2 leading-tight">
                                <h3 className="text-base text-gray-900 font-bold">
                                  {new Date(event.startDate)
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}
                                </h3>
                                <p className="text-xs text-gray-600 font-bold">
                                  {new Date(event.startDate)
                                    .toLocaleString("default", {
                                      month: "short",
                                    })
                                    .toUpperCase()}
                                </p>
                              </div>
                            )}
                        </div>

                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {event.title}
                          </h3>
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 text-sm">
                          <span
                            className={`px-2 py-0.5 rounded ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                          <span className="text-gray-400 italic">
                            {event.createdBy}
                          </span>
                        </div>
                      </div>
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
                    <Card className="w-full h-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                      {!loaded && (
                        <div className="absolute inset-0 z-10 p-4 animate-pulse space-y-4 bg-white">
                          <div className="w-full h-48 bg-gray-200 rounded-md" />
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-100 rounded w-1/3 mt-4" />
                        </div>
                      )}

                      <div
                        className={`flex flex-col h-full relative transition-opacity duration-300 ${
                          loaded ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="relative mb-4">
                          <Image
                            src={event.image}
                            width={350}
                            height={250}
                            alt="Event"
                            className="rounded-md object-cover w-full h-48"
                            onLoad={() => setLoaded(true)}
                          />

                          {event.startDate &&
                            !isNaN(new Date(event.startDate)) && (
                              <div className="absolute top-2 right-2 bg-white shadow text-sm rounded text-center font-semibold px-2 py-2 leading-tight">
                                <h3 className="text-base text-gray-900 font-bold">
                                  {new Date(event.startDate)
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}
                                </h3>
                                <p className="text-xs text-gray-600 font-bold">
                                  {new Date(event.startDate)
                                    .toLocaleString("default", {
                                      month: "short",
                                    })
                                    .toUpperCase()}
                                </p>
                              </div>
                            )}
                        </div>

                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {event.title}
                          </h3>
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 text-sm">
                          <span
                            className={`px-2 py-0.5 rounded ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                          <span className="text-gray-400 italic">
                            {event.createdBy}
                          </span>
                        </div>
                      </div>
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
                    <Card className="w-full h-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                      {!loaded && (
                        <div className="absolute inset-0 z-10 p-4 animate-pulse space-y-4 bg-white">
                          <div className="w-full h-48 bg-gray-200 rounded-md" />
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-100 rounded w-1/3 mt-4" />
                        </div>
                      )}

                      <div
                        className={`flex flex-col h-full relative transition-opacity duration-300 ${
                          loaded ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="relative mb-4">
                          <Image
                            src={event.image}
                            width={350}
                            height={250}
                            alt="Event"
                            className="rounded-md object-cover w-full h-48"
                            onLoad={() => setLoaded(true)}
                          />

                          {event.startDate &&
                            !isNaN(new Date(event.startDate)) && (
                              <div className="absolute top-2 right-2 bg-white shadow text-sm rounded text-center font-semibold px-2 py-2 leading-tight">
                                <h3 className="text-base text-gray-900 font-bold">
                                  {new Date(event.startDate)
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}
                                </h3>
                                <p className="text-xs text-gray-600 font-bold">
                                  {new Date(event.startDate)
                                    .toLocaleString("default", {
                                      month: "short",
                                    })
                                    .toUpperCase()}
                                </p>
                              </div>
                            )}
                        </div>

                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {event.title}
                          </h3>
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 text-sm">
                          <span
                            className={`px-2 py-0.5 rounded ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                          <span className="text-gray-400 italic">
                            {event.createdBy}
                          </span>
                        </div>
                      </div>
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
