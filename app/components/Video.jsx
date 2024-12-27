"use client";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { PlusIcon, HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";

const Video = ({ params }) => {
  const idParams = use(params);
  const id = idParams.id;
  const mediaType = useSearchParams().get("media_type");
  const title = useSearchParams().get("title");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [details, setDetails] = useState({});
  const movieSrc = `https://vidsrc.xyz/embed/movie/${id}`;
  const tvSrc = `https://vidsrc.xyz/embed/tv/${id}`;
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";

  async function fetchSimilarMovies() {
    const response = await fetchData(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`)
    setSimilarMovies(response)
  }

  async function fetchDetails() {
    const response = await fetchData(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    console.log(response)
    setDetails(response)
  }

  useEffect(() => {
    fetchDetails();
    fetchSimilarMovies();
    console.log(details)
  }, [details])

  return (
    <div>
      <iframe
        src={mediaType === "Movies" ? movieSrc : tvSrc}
        className="w-screen h-[50vh] lg:h-screen"
        allowFullScreen={true}
        referrerPolicy="origin"
      ></iframe>

      <h1 className="font-bold text-neutral-200 text-2xl px-6 py-2">{title}</h1>

      <p className="px-6 py-2 text-sm text-[var(--primary)]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita voluptates accusantium magni quaerat omnis quam fuga praesentium. A iusto distinctio beatae nisi totam! Commodi, odit debitis! Consequuntur, quisquam itaque? Odit.</p>

      <div className="flex justify-evenly p-6">
        <div className="flex flex-col items-center">
          <PlusIcon className="w-6 mb-2" />
          <p className="text-xs">My List</p>
        </div>
        <div className="flex flex-col items-center">
          <HandThumbUpIcon className="w-6 mb-2" />
          <p className="text-xs">Rate</p>
        </div>
        <div className="flex flex-col items-center">
          <ShareIcon className="w-6 mb-2" />
          <p className="text-xs">Share</p>
        </div>
      </div>

      <hr />
      <h1 className="font-roboto text-lg lg:text-4xl font-bold border-t-4 py-2 px-2 lg:px-4 mx-6 border-red-500 w-fit">More like this</h1>
      <div className="grid grid-cols-5 lg:grid-cols-8 gap-3 lg:gap-5 px-6">
        {similarMovies.map((movie) => (
          <div key={movie.id}>
            <img className="card-shadow rounded-md" src={`${IMG_PATH}${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
