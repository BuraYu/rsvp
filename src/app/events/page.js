"use client";

import { useState } from "react";
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

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  const eventTypes = [
    "All",
    "Music",
    "Games",
    "Sports",
    "Film",
    "Literature",
    "Technology",
  ];

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
            className="relative w-full"
          >
            {/* Arrows */}
            <div className="absolute -top-6 right-15 md:right-25 lg:right-19 xl:right-15 2xl:right-18 z-10 flex space-x-2">
              <CarouselPrevious className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
              <CarouselNext className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </div>

            {/* Carousel Items */}
            <CarouselContent className="flex gap-4 px-2">
              {Array.from({ length: 10 }).map((_, index) => (
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
                        <div className="w-1/2 md:w-full flex flex-col justify-center">
                          <span className="inline-block self-start text-xs text-pink-500 bg-pink-100 rounded-md px-2 py-1">
                            Category
                          </span>
                          <h4 className="text-lg font-bold mt-2">test</h4>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div></div>
          {/* Offline events */}
          <h2 className="text-3xl font-bold">Offline Events</h2>
          {/* Online events */}
          <h2 className="text-3xl font-bold">Online Events</h2>
        </div>
      </div>
    </div>
  );
}
