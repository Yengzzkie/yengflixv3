"use client";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { useSession } from "next-auth/react";
import {
  PlusIcon,
  HandThumbUpIcon,
  ShareIcon,
  CheckIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import NotificationAlert from "./ui/NotificationAlert";
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
  const [showOverlay, setShowOverlay] = useState(false);
  const movieSrc = `https://vidsrc.xyz/embed/movie/${id}`;
  const tvSrc = `https://vidsrc.xyz/embed/tv/${id}`;
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const tvDetailsEndpoint = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const session = useSession();
  const isVerified = session?.data?.user?.isVerified;

  async function fetchSimilarMovies() {
    try {
      const response =
        mediaType === "Movies"
          ? await fetchData(
              `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`
            )
          : await fetchData(
              `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`
            );

      if (!response) {
        setSimilarMovies([]);
        return;
      }
      setSimilarMovies(response);
    } catch (error) {
      console.error({ error });
      if (error) {
        setSimilarMovies([]);
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
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
        }
      );
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

    const timeout = setTimeout(() => {
      setShowOverlay(true);
    }, 180000);

    return () => clearTimeout(timeout);
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
      console.error({ error });
    }

    setTimeout(() => {
      setAdded(false);
      setButtonText(null);
    }, 2000);
  }

  return (
    <div>
      <NotificationAlert
        status={"success"}
        text={
          <>
            It is recommended that you stream from 'Brave Browser' to disable
            the pop-up ads when playing the video. The installer specific for
            your device can be downloaded{" "}
            <a
              href="https://brave.com/download"
              target="_blank"
              className="font-semibold underline text-blue-400"
            >
              here
            </a>
          </>
        }
      />
      <TopExpandableCard
        open={open}
        setOpen={setOpen}
        selectedSlide={selectedSlide}
        media_type={mediaType}
      />
      <div className="relative w-screen h-[50vh] lg:h-screen">
        <iframe
          src={mediaType === "Movies" ? movieSrc : tvSrc}
          className={`video-player relative w-full h-full`}
          allowFullScreen={true}
          referrerPolicy="origin"
        ></iframe>
        {(!isVerified && showOverlay) && (
          <div className="flex flex-col justify-center items-center gap-4 text-center text-zinc-200 absolute top-0 left-0 w-full h-full bg-zinc-800/80 backdrop-blur-md z-50">
            <ExclamationCircleIcon className="h-10 w-10 text-yellow-500" />
            <p className="font-semibold text-md lg:text-2xl ">Your email ({session?.data?.user?.email}) is unverified.</p>
            <p className="font-extralight text-xs lg:text-sm">To continue watching, please verify it now by going to <strong className="font-bold">Resources</strong> &gt; <strong className="font-bold">Account Settings</strong> &gt; click <strong className="font-bold">'Resend Verification Email'</strong></p>
            <p className="font-extralight text-xs lg:text-sm italic">If you don't receive the Verification Email, check your <strong className="font-bold">Spam</strong> folder</p>
          </div>
        )}
      </div>

      <h1 className="font-bold text-neutral-200 text-2xl px-3 lg:px-6 py-2">
        {details.title || details.name}
      </h1>
      <p className="px-3 lg:px-6 py-2 text-sm text-[var(--primary-content)]">
        {details.overview}
      </p>

      <div className="flex justify-evenly p-6">
        <div className="flex flex-col items-center">
          {added ? (
            <CheckIcon className="w-6 mb-2 cursor-pointer hover:text-[var(--secondary-dark)]" />
          ) : (
            <PlusIcon
              onClick={() => handleAddToList()}
              className="w-6 mb-2 cursor-pointer hover:text-[var(--secondary-dark)]"
            />
          )}
          <p className="text-xs">{added ? buttonText : "Add To List"}</p>
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
          <p className="text-[var(--primary-light)] italic w-full">
            No Similar movies for this title
          </p>
        ) : (
          similarMovies.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer"
              onClick={() => handleSlideClick(movie)}
            >
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
