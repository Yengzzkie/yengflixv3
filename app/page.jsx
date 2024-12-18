"use client";
import { ToastContainer } from "react-toastify";
import Carousel from "./components/Carousel";
import ExpandableCards from "./components/ExpandableCard";
import { useEffect } from "react";
import { fetchData } from "./lib/fetchData";
import {
  useMovieData,
  useTvData,
  moviePage,
  useMoviePage,
  useBrowseMovies,
} from "./stores/useDataStore";

const HomePage = () => {
  const { movieData, setMovieData } = useMovieData();
  const { tvData, setTvData } = useTvData();
  const { browseMovies, setBrowseMovies } = useBrowseMovies();
  const { moviePage } = useMoviePage();

  async function fetchMovieData() {
    const movies = await fetchData(
      "https://api.themoviedb.org/3/trending/movie/day"
    );
    setMovieData(movies);
    // console.log(movies);
  }

  async function fetchTvData() {
    const tvShows = await fetchData(
      "https://api.themoviedb.org/3/trending/tv/day"
    );
    setTvData(tvShows);
    // console.log(tvShows);
  }

  async function fetchAllMovies() {
    const allMovies = await fetchData(
      `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${moviePage}&sort_by=popularity.desc`
    );
    setBrowseMovies(allMovies);
    console.log(allMovies);
  }

  useEffect(() => {
    fetchTvData();
    fetchMovieData();
    fetchAllMovies();
  }, [setMovieData, setTvData, setBrowseMovies]);

  return (
    <>
      <ToastContainer />
      {/* TOP 10 MOVIES */}
      <Carousel data={movieData} media_type={"Movies"} />

      {/* TOP 10 TV */}
      <Carousel data={tvData} media_type={"TV Shows"} />

      {/* RECOMMENDED SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-16 grid-flow-row">
        <div>
          <h1>Recommended</h1>
          {/* <ExpandableCards data={browseMovies} /> */}
        </div>
        <div>
        <h1>Recommended</h1>
          <ExpandableCards data={browseMovies} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
