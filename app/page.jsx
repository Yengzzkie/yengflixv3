"use client";
import { ToastContainer } from "react-toastify";
import RecommendedCarousel from "./components/RecommendedCarousel";
import ExpandableCards from "./components/ExpandableCard";
import { useEffect, useState } from "react";
import { fetchData } from "./lib/fetchData";
import {
  useMovieData,
  useTvData,
  useMoviePage,
  useBrowseMovies,
  useBrowseTv,
} from "./stores/useDataStore";
import EmblaCarousel from "./components/TopCarousel";

const HomePage = () => {
  const { movieData, setMovieData } = useMovieData();
  const { tvData, setTvData } = useTvData();
  const { allMovies, setAllMovies } = useBrowseMovies();
  const { allTv, setAllTv } = useBrowseTv();
  const { moviePage } = useMoviePage();
  const [loading, setLoading] = useState(true);
  // const API_KEY = process.env.NEXT_PUBLIC_API_KEY

  const OPTIONS = { align: 'start', dragFree: true, loop: true }

  async function fetchMovieData() {
    const movies = await fetchData(
      "https://api.themoviedb.org/3/trending/movie/day"
    );
    setMovieData(movies);
  }

  async function fetchTvData() {
    const tvShows = await fetchData(
      "https://api.themoviedb.org/3/trending/tv/day"
    );
    setTvData(tvShows);
  }

  async function fetchAllMovies() {
    const allMovies = await fetchData(
      `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${moviePage}&sort_by=popularity.desc`
    );
    setAllMovies(allMovies);
  }

  async function fetchAllTv() {
    const allTv = await fetchData(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${moviePage}&sort_by=popularity.desc`
    );
    setAllTv(allTv);
  }

  useEffect(() => {
    const fetchDataAll = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchMovieData(), fetchTvData(), fetchAllTv(), fetchAllMovies()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAll();
  }, [moviePage, setAllTv]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
            <span className="ml-4 text-lg font-medium">Loading...</span>
          </div>
          <p className="ml-4 text-sm font-sm italic p-4">If the page doesn't load, try reloading the page</p>
        </div>
      ) : (
        <>
          {/* TOP 10 MOVIES */}
          <EmblaCarousel slides={movieData} options={OPTIONS} media_type={"Movies"} />
          {/* <Carousel data={movieData} media_type={"Movies"} /> */}

          {/* TOP 10 TV */}
          <EmblaCarousel slides={tvData} options={OPTIONS} media_type={"TV Shows"} />
          {/* <Carousel data={tvData} media_type={"TV Shows"} /> */}
          <RecommendedCarousel slides={allMovies} options={OPTIONS} media_type={"Movies"} />
          <RecommendedCarousel slides={allTv} options={OPTIONS} media_type={"TV Shows"} />
          {/* RECOMMENDED SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 lg:px-16 grid-flow-row">
            <div>
              <h1>Recommended</h1>
              <ExpandableCards data={allMovies} />
            </div>
            <div>
              <h1>Recommended</h1>
              <ExpandableCards data={allTv} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
