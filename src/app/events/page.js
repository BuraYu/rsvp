"use client";

import { useState, useEffect } from "react";
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
      const online = events.filter((event) => event.mode === "online");
      const offline = events.filter((event) => event.mode === "offline");

      setOnlineEvents(online);
      setOfflineEvents(offline);
    };

    separateEvents(events);
  }, [events]);

  const handleButtonClick = (category) => {
    setActiveButton(category);

    if (category === "All") {
      setFilteredEvents(events);
      setOnlineEvents(events.filter((event) => event.mode === "online"));
      setOfflineEvents(events.filter((event) => event.mode === "offline"));
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
      setOnlineEvents(filtered.filter((event) => event.mode === "online"));
      setOfflineEvents(filtered.filter((event) => event.mode === "offline"));
    }
  };

  function formatDate(dateString) {
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
      <Navbar />
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
                className={` cursor-pointer text-sm ${
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
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative w-full mb-10"
          >
            {/* Arrows */}
            <div className="absolute -top-6 right-15 md:right-25 lg:right-19 xl:right-15 2xl:right-18 z-10 flex space-x-2">
              <CarouselPrevious className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
              <CarouselNext className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </div>

            {/* Carousel Items */}
            <CarouselContent className="flex gap-4 px-2">
              {filteredEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-shrink-0 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="w-full md:w-[85%]">
                    <CardContent className="relative flex h-auto p-4">
                      <div className="flex flex-row md:flex-col space-y-2 w-full">
                        <div className="w-1/2 md:w-full">
                          <Image
                            src="https://picsum.photos/350/250"
                            width={350}
                            height={250}
                            alt="Picture of the author"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="w-1/2 md:w-full flex flex-col justify-center gap-1 sm:ml-5 md:ml-0">
                          <span className="text-[0.7rem] text-gray-500 mt-1">
                            {formatDate(event.dateTime)}
                          </span>{" "}
                          <h3 className="text-2xl font-bold mb-4">
                            {event.name}
                          </h3>
                          <span
                            className={`inline-block self-start text-[0.6rem] rounded-md px-2 py-1 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {" "}
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Offline events */}
          <h2 className="text-3xl font-bold mb-3">Offline Events</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative w-full mb-10"
          >
            {/* Arrows */}
            <div className="absolute -top-6 right-15 md:right-25 lg:right-19 xl:right-15 2xl:right-18 z-10 flex space-x-2">
              <CarouselPrevious className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
              <CarouselNext className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </div>

            {/* Carousel Items */}
            <CarouselContent className="flex gap-4 px-2">
              {offlineEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-shrink-0 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="w-full md:w-[85%]">
                    <CardContent className="relative flex h-auto p-4">
                      <div className="flex flex-row md:flex-col space-y-2 w-full">
                        <div className="w-1/2 md:w-full">
                          <Image
                            src="https://picsum.photos/350/250"
                            width={350}
                            height={250}
                            alt="Picture of the author"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="w-1/2 md:w-full flex flex-col justify-center gap-1 sm:ml-5 md:ml-0">
                          <span className="text-[0.7rem] text-gray-500 mt-1">
                            {formatDate(event.dateTime)}
                          </span>{" "}
                          <h3 className="text-2xl font-bold mb-4">
                            {event.name}
                          </h3>
                          <span
                            className={`inline-block self-start text-[0.6rem] rounded-md px-2 py-1 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {" "}
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Online events */}
          <h2 className="text-3xl font-bold mb-3">Online Events</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="relative w-full"
          >
            {/* Arrows */}
            <div className="absolute -top-6 right-15 md:right-25 lg:right-19 xl:right-15 2xl:right-18 z-10 flex space-x-2">
              <CarouselPrevious className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
              <CarouselNext className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </div>

            {/* Carousel Items */}
            <CarouselContent className="flex gap-4 px-2">
              {onlineEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-shrink-0 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="w-full md:w-[85%]">
                    <CardContent className="relative flex h-auto p-4">
                      <div className="flex flex-row md:flex-col space-y-2 w-full">
                        <div className="w-1/2 md:w-full">
                          <Image
                            src="https://picsum.photos/350/250"
                            width={350}
                            height={250}
                            alt="Picture of the author"
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="w-1/2 md:w-full flex flex-col justify-center gap-1 sm:ml-5 md:ml-0">
                          <span className="text-[0.7rem] text-gray-500 mt-1">
                            {formatDate(event.dateTime)}
                          </span>{" "}
                          <h3 className="text-2xl font-bold mb-4">
                            {event.name}
                          </h3>
                          <span
                            className={`inline-block self-start text-[0.6rem] rounded-md px-2 py-1 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {" "}
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
