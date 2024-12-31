"use client";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import {
  PlusIcon,
  HandThumbUpIcon,
  ShareIcon,
  CheckIcon
} from "@heroicons/react/24/outline";
import axios from "axios";
import TopExpandableCard from "./TopExpandableCard";
import addToList from "../utils/addToList";

const Video = ({ params }) => {
  const idParams = use(params);
  const id = idParams.id;
  const mediaType = useSearchParams().get("media_type");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [details, setDetails] = useState({});
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const movieSrc = `https://vidsrc.xyz/embed/movie/${id}`;
  const tvSrc = `https://vidsrc.xyz/embed/tv/${id}`;
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const tvDetailsEndpoint = `https://api.themoviedb.org/3/tv/${id}?language=en-US`

  async function fetchSimilarMovies() {
    try {
      const response = mediaType === "Movies" ? await fetchData(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`) : 
      await fetchData(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`)

      console.log(response)
      if (!response) {
        setSimilarMovies([]);
        return;
      }
      setSimilarMovies(response);
    } catch (error) {
      console.error({ error })
      if (error) {
        setSimilarMovies([])
      }
    }
  }

  async function fetchDetails() {
    try {
      const response = await axios.get(
        mediaType === "Movies" ? movieDetailsEndpoint : tvDetailsEndpoint,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      console.log(response)
      // im using axios to fetch the details because for some reason the fetchData hook is returning undefined
      setDetails(response?.data);
    } catch (error) {
      console.error({ error });
    }
  }

  // fetch similar movies and currently viewing movie at once
  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        await Promise.all([fetchSimilarMovies(), fetchDetails()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAll();
  }, []);

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
    setOpen(true);
  };

  // add-to-list logic
  async function handleAddToList() {
    // assign the movie details from fetched data from fetchDetails()
    const newMovie = details;

    try {
      const response = await addToList(newMovie);
      setButtonText(response);
      setAdded(true);
    } catch (error) {
      console.error({ error })
    }

    setTimeout(() => {
      setAdded(false);
      setButtonText(null)
    }, 2000);
  }

  return (
    <div>
      <TopExpandableCard open={open} setOpen={setOpen} selectedSlide={selectedSlide} media_type={mediaType} />
      <iframe
        src={mediaType === "Movies" ? movieSrc : tvSrc}
        className="w-screen h-[50vh] lg:h-screen"
        allowFullScreen={true}
        referrerPolicy="origin"
      ></iframe>

      <h1 className="font-bold text-neutral-200 text-2xl px-3 lg:px-6 py-2">
        {details.title || details.name}
      </h1>
      <p className="px-3 lg:px-6 py-2 text-sm text-[var(--primary-content)]">
        {details.overview}
      </p>

      <div className="flex justify-evenly p-6">
        <div className="flex flex-col items-center">
          {added ? <CheckIcon className="w-6 mb-2 cursor-pointer hover:text-[var(--secondary-dark)]" /> : <PlusIcon onClick={() => handleAddToList()} className="w-6 mb-2 cursor-pointer hover:text-[var(--secondary-dark)]" />}
          <p className="text-xs">{added ? (buttonText) : ("Add To List")}</p>
        </div>
        <div className="flex flex-col items-center">
          <HandThumbUpIcon className="w-6 mb-2 cursor-pointer hover:text-[var(--secondary-dark)]" />
          <p className="text-xs">Rate</p>
        </div>
        <div className="flex flex-col items-center">
          <ShareIcon className="w-6 mb-2 cursor-pointer hover:text-[var(--secondary-dark)]" />
          <p className="text-xs">Share</p>
        </div>
      </div>

      <hr />
      <h1 className="font-roboto text-lg lg:text-4xl font-bold border-t-4 py-2 px-2 lg:px-4 mx-6 border-red-500 w-fit">
        More like this
      </h1>
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-5 px-3 lg:px-6">
        {similarMovies.length === 0 ? (
          <p className="text-[var(--primary-light)] italic w-full">No Similar movies for this title</p>
        ) : (
          similarMovies.map((movie) => (
            <div key={movie.id} className="cursor-pointer" onClick={() => handleSlideClick(movie)}>
              <img
                className="card-shadow rounded-md"
                loading="lazy"
                src={`${IMG_PATH}${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Video;
