import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

const EmblaCarousel = (props) => {
  const { slides, options, media_type } = props;
  const [emblaRef] = useEmblaCarousel(options);
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";

  return (
    <section className="embla my-6 lg:my-10 mx-auto px-3">
      <h1 className="font-roboto text-2xl lg:text-4xl font-bold">Top 10 in {media_type}</h1>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.slice(0, 10).map((slide, index) => (
            <div className="embla__slide grid mx-6 lg:mx-0 grid-cols-12 lg:grid-cols-8" key={slide.id}>
              <h1 className="absolute -left-8 lg:left-7 top-[65%] -translate-y-1/2 text-[75px] lg:text-[200px] text-shadow tracking-[-20px] lg:tracking-[-55px] leading-tight col-start-1 z-20">
                {index + 1}
              </h1>
              {/* <Link href={`/watch/${slide.id}?media_type=${media_type}`}> */}
                <Image
                  className="card-shadow rounded-lg col-start-3 lg:col-start-4 col-end-[-1] z-30 w-full lg:w-48 cursor-pointer"
                  src={`${IMG_PATH}${slide.poster_path}`}
                  alt={`${slide.title}`}
                  layout="responsive"
                  width={300}
                  height={300}
                />
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
