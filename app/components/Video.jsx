"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  HandThumbUpIcon,
  ShareIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import NotificationAlert from "./ui/NotificationAlert";
import axios from "axios";
import TopExpandableCard from "./TopExpandableCard";
import addToList from "../utils/addToList";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  ThemeProvider,
  Avatar
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PencilIcon } from "@heroicons/react/24/solid";
import { generateAvatar } from "./ui/AvatarIcon";
import { getTimeAgo } from "../utils/getTimeAgo";
import Head from "next/head";

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
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);

  const servers = [
    { server: `me` },
    { server: `in` },
    { server: `pm` },
    { server: `net` },
    { server: `io` },
    { server: `vc` },
  ]

  const [server, setServer] = useState(servers[0].server);
  const movieSrc = `https://vidsrc.${server}/embed/movie/${id}`;
  const tvSrc = `https://vidsrc.${server}/embed/tv/${id}`;
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const movieDetailsEndpoint = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const tvDetailsEndpoint = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const session = useSession();
  const isVerified = session?.data?.user?.isVerified;



  // custom theme for the tabs
  const theme = {
    tab: {
      defaultProps: {
        className: "",
        activeClassName: "",
        disabled: false,
      },
      styles: {
        base: {
          indicator: {
            position: "absolute",
            inset: "inset-0",
            zIndex: "z-10",
            height: "h-full",
            bg: "bg-zinc-400/40",
            borderRadius: "rounded-sm",
            boxShadow: "shadow",
            color: "text-red-500",
          },
        },
      },
    },
  };

  // tabs contents
  const tabs = [
    {
      label: "More Like This",
      value: "More Like This",
      icon: Square3Stack3DIcon,
      component: (
        <>
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
        </>
      ),
    },
    {
      label: "Write a Review",
      value: "Write a Review",
      icon: PencilIcon,
      component: (
        <>
          <div className="px-6 py-4 min-h-1/2">
            <h2 className="text-lg font-semibold text-neutral-200">
              Add a comment
            </h2>
            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment here..."
              ></textarea>
              <label htmlFor="rating" className="block mt-2 text-neutral-200">
                What do you think of this movie?
              </label>
              <select
                name="rating"
                id="rating"
                className="w-full max-w-xs mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setRating(e.target.value)}
                defaultValue={"GOOD"}
              >
                <option value="POOR">Poor</option>
                <option value="AVERAGE">Average</option>
                <option value="GOOD">Good</option>
                <option value="EXCELLENT">Excellent</option>
              </select>
            </div>
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

          <div className="mt-6">
            {reviews.length === 0 ? (<h1 className="text-lg text-center mb-10">No reviews yet. Be the first to review this movie!</h1>) : (
              reviews
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-800 p-4 rounded-md mb-4 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar
                        src={generateAvatar(encodeURIComponent(review?.user?.name))}
                        alt={review?.user?.name}
                        size="xs"
                      />
                      <h4 className="text-md font-semibold text-zinc-300 ml-1">
                        / {review?.user?.name}
                      </h4>
                      <span className="text-xs italic text-zinc-500 text-extralight ml-1"> - posted {getTimeAgo(review.createdAt)} ago</span>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        review.rating === "EXCELLENT"
                          ? "text-green-500"
                          : review.rating === "GOOD"
                          ? "text-yellow-500"
                          : review.rating === "AVERAGE"
                          ? "text-gray-500"
                          : "text-red-500"
                      }`}
                    >
                      {review.rating}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 mt-2">
                    {review.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      ),
    },
  ];

  // fetch similar movies
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

  // fetch movie details
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

  // fetch reviews for the movie
  async function fetchReviews() {
    try {
      const response = await axios.get(`/api/review?movieId=${id}`);
      setReviews(response?.data);
    } catch (error) {
      console.error("Failed fetching reviews for this movie", error);
    }
  }

  // fetch similar movies and currently viewing movie at once
  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        await Promise.all([
          fetchSimilarMovies(),
          fetchDetails(),
          fetchReviews(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAll();
    console.log(movieSrc, server)

    // display overlay after 3 seconds
    const timeout = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [comment, server, setServer]);

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

  // review submit handler
  async function handleCommentSubmit() {
    if (!comment.trim()) return;

    const reviewPayload = {
      userId: session?.data?.user?.id,
      content: comment,
      movie_id: id,
      rating: rating,
    };
    await axios.post("/api/review", reviewPayload);
    setComment("");
  }
  console.log({ details });

  return (
    <div>
      <Head>
        <title>{details.title} - Yengflix</title>
        <meta property="og:title" content={`${details.title} - Yengflix`} />
        <meta property="og:description" content={details.overview} />
        <meta property="og:image" content={`https://image.tmdb.org/t/p/original/${details.poster_path}`} />
        <meta property="og:url" content={`https://yengflix.com/movie/${details.slug}`} />
        <meta property="og:type" content="video.movie" />
      </Head>

      {/* Notification Alert */}
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
        {/* Video Player */}
        <iframe
          src={mediaType === "Movies" ? movieSrc : tvSrc}
          className={`video-player relative w-full h-full`}
          allowFullScreen={true}
          referrerPolicy="origin"
        ></iframe>

        {/* overlay for unverified users */}
        {!isVerified && showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.5 }}
            className="flex flex-col justify-center items-center gap-4 text-center text-zinc-200 absolute top-0 left-0 w-full h-full bg-zinc-800/80 backdrop-blur-md z-50"
          >
            <ExclamationCircleIcon className="h-10 w-10 text-yellow-500" />
            <p className="font-semibold text-md lg:text-2xl ">
              Your email ({session?.data?.user?.email}) is unverified.
            </p>
            <p className="font-extralight text-xs lg:text-sm">
              To continue watching, please verify it now by going to{" "}
              <strong className="font-bold">Resources</strong> &gt;{" "}
              <strong className="font-bold">Account Settings</strong> &gt; click{" "}
              <strong className="font-bold">'Resend Verification Email'</strong>
            </p>
            <p className="font-extralight text-xs lg:text-sm italic">
              If you don't receive the Verification Email, check your{" "}
              <strong className="font-bold">Spam</strong> folder
            </p>
          </motion.div>
        )}
      </div>

        {/* Server buttons */}
      <div className="flex flex-col lg:flex-row items-center gap-4 p-6 border-b-[1px] mb-2">
        <p className="text-neutral-200 text-sm">If the video doesn't load, try other servers:</p>
        <div className="flex flex-wrap gap-3">
          {servers.map((server, index) => (
            <button key={index} className="border text-xs rounded-md p-1 w-16 lg:w-20 bg-red-600 hover:bg-red-500" onClick={() => setServer(server.server)}>Server {index + 1}</button>
          ))}
        </div>
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
      {/* TABS FOR WRITE A REVIEW AND SIMILAR MOVIES */}
      <ThemeProvider value={theme}>
        <Tabs value="More Like This">
          <TabsHeader>
            {tabs.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  <p className="text-md lg:text-2xl">{label}</p>
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabs.map(({ value, component }) => (
              <TabPanel key={value} value={value}>
                {component}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </ThemeProvider>
    </div>
  );
};

export default Video;
