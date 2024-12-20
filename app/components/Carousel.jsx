"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useMovieData } from "../stores/useDataStore";
import Link from "next/link";

function Carousel({ data, media_type }) {
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  // const { movieData } = useMovieData();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    className: "lg:mx-10",
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
          }
        }
      ]
  };

  return (
    <div className="slider-container my-8 lg:my-6">
      <h1 className="text-2xl ml-8">Top 10 in {media_type}</h1>
      <Slider {...settings}>
        {data.slice(0, 10).map((data, index) => (
          <Link key={data.id} href={`/watch/${data.id}?media_type=${data.media_type}`}>
            <div  className="relative h-32 md:h-72 flex px-16 outline-none" >
              <img className="absolute top-1/2 left-1/2 translateXY rounded-lg card-shadow z-20 w-16 md:w-32 lg:w-40 m-auto" src={`${IMG_PATH}${data.poster_path}`} alt={data.title || data.name} />
              <h1 className="absolute top-[58%] lg:top-[60%] left-[8%] lg:left-[10%] translateXY text-[60px] md:text-[120px] lg:text-[200px] z-10 text-shadow tracking-[-10px] lg:tracking-[-20px]">{index + 1}</h1>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
