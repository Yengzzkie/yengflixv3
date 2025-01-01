import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import TopExpandableCard from "./TopExpandableCard";
import Link from "next/link";

const MyListCarousel = (props) => {
  const { slides, options } = props;
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [mediaType, setMediaType] = useState(null)
  const [open, setOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel(options);
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const media_type = mediaType;

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);

    // this gave me a headache, this is causing misrendering as the video rendering relies on
    // the media_type of the video
    if (slide.title) { // so if the media object has "Title"...
        setMediaType("Movies") // assign media_type as "Movies"
    } else {
        setMediaType("TV%20Shows") // otherwise assign as "TV Shows
    }

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
          My List
        </h1>
        <h2 className="text-xs lg:text-lg ml-auto">
          <Link href={`/mylist`}>Manage your List</Link>
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
                // width={300}
                // height={300}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyListCarousel;
