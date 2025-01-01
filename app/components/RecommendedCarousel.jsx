import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import TopExpandableCard from "./TopExpandableCard";
import Link from "next/link";

const RecommendedCarousel = (props) => {
  const { slides, options, media_type } = props;
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [open, setOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel(options);
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const route = media_type.toLowerCase();

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
    setOpen(true);
  };

  return (
    <section className="embla my-6 lg:my-10 mx-auto px-3">
      <TopExpandableCard
        open={open}
        setOpen={setOpen}
        selectedSlide={selectedSlide}
        media_type={media_type}
      />
      <div className="flex justify-between">
        <h1 className="font-roboto text-lg text-nowrap lg:text-4xl font-bold">
          Recommended {media_type}
        </h1>
        <h2 className="text-xs lg:text-lg ml-auto">
          <Link href={`/browse-${route}`}>Browse all {media_type} </Link>
          <ChevronRightIcon className="inline-block w-4" />
        </h2>
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div
              onClick={() => handleSlideClick(slide)}
              className="embla__slide max-w-fit mx-2"
              key={slide.id}
            >
              <img
                className="card-shadow rounded-md lg:w-44 cursor-pointer"
                src={`${IMG_PATH}${slide.poster_path}`}
                alt={`${slide.title}`}
                width={300}
                height={300}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedCarousel;
