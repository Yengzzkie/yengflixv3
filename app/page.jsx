"use client";
import RecommendedCarousel from "./components/RecommendedCarousel";
import { useEffect, useState } from "react";
import { fetchData } from "./utils/fetchData";
import {
  useMovieData,
  useTvData,
  usePagination,
  useBrowseMovies,
  useBrowseTv,
  useMyList,
} from "./stores/useDataStore";
import EmblaCarousel from "./components/TopCarousel";
import { getSession } from "next-auth/react";
import axios from "axios";
import MyListCarousel from "./components/MyListCarousel";

const HomePage = () => {
  const { movieData, setMovieData } = useMovieData();
  const { tvData, setTvData } = useTvData();
  const { allMovies, setAllMovies } = useBrowseMovies();
  const { allTv, setAllTv } = useBrowseTv();
  const { page } = usePagination();
  const { myList, setMyList } = useMyList();
  const [loading, setLoading] = useState(true);
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
      `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );
    setAllMovies(allMovies);
  }

  async function fetchAllTv() {
    const allTv = await fetchData(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`
    );
    setAllTv(allTv);
  }

  async function fetchMyList() {
    const session = await getSession();
    const email = session.user.email;

    const response = await axios.get(`/api/users/list?email=${email}`);
    setMyList(response.data.list)
  }
  

  useEffect(() => {
    const fetchDataAll = async () => {
      setLoading(true);
      try {
        fetchMyList()
        await Promise.all([fetchMovieData(), fetchTvData(), fetchAllTv(), fetchAllMovies()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAll();
  }, [page, setMyList]);

  return (
    <>
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

          {/* TOP 10 TV */}
          <EmblaCarousel slides={tvData} options={OPTIONS} media_type={"TV Shows"} />


          {/* RECOMMENDED SECTION */}
          <RecommendedCarousel slides={allMovies} options={OPTIONS} media_type={"Movies"} />
          <RecommendedCarousel slides={allTv} options={OPTIONS} media_type={"TV Shows"} />

          {/* MY LIST SECTION */}
          <MyListCarousel slides={myList} options={OPTIONS} media_type={"Movies"} />
        </>
      )}
    </>
  );
};

export default HomePage;
