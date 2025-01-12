import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TopExpandableCard from "./TopExpandableCard"

const EmblaCarousel = (props) => {
  const { slides, options, media_type, isTopTen } = props;
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [open, setOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel(options);
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
    setOpen(true);
  };

  return (
    <section className="embla my-6 lg:my-10 mx-auto px-3">
      <TopExpandableCard open={open} setOpen={setOpen} selectedSlide={selectedSlide} media_type={media_type} />
      <h1 className="font-roboto text-2xl lg:text-4xl font-bold">Top 10 in {media_type}</h1>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.slice(0, 10).map((slide, index) => (
            <div onClick={() => handleSlideClick(slide)} className="embla__slide grid mx-5 lg:mx-0 grid-cols-12 lg:grid-cols-8" key={slide.id}>
              <h1 className="absolute -left-3 lg:left-20 -bottom-6 lg:-bottom-14 font-extrabold lg:font-semibold text-[65px] md:text-[170px] text-shadow tracking-[-17px] lg:tracking-[-35px] col-start-1 z-[999]">
                {index + 1}
              </h1>
              <img
                className="card-shadow card-shadow rounded-lg col-start-3 lg:col-start-4 col-end-[-1] z-30 w-full lg:w-48 cursor-pointer"
                src={`${IMG_PATH}${slide.poster_path}`}
                alt={`${slide.media_type === 'movie' ? slide.title : slide.name}`}
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

export default EmblaCarousel;
