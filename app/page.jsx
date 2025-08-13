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
  // useEditorsChoice,
} from "./stores/useDataStore";
import EmblaCarousel from "./components/TopCarousel";
import { getSession } from "next-auth/react";
import axios from "axios";
import MyListCarousel from "./components/MyListCarousel";
import NotificationAlert from "./components/ui/NotificationAlert";
import { Spinner } from "./components/Spinner";
import Head from "./components/Head";

const HomePage = () => {
  const { movieData, setMovieData } = useMovieData();
  const { tvData, setTvData } = useTvData();
  const { allMovies, setAllMovies } = useBrowseMovies();
  const { allTv, setAllTv } = useBrowseTv();
  const { page } = usePagination();
  const { myList, setMyList } = useMyList();
  // const { editorsChoice, setEditorsChoice } = useEditorsChoice();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const OPTIONS = { align: "start", dragFree: true, loop: true };

  async function fetchMovieData() {
    const movies = await fetchData(
      "https://api.themoviedb.org/3/trending/movie/day"
    );

    // Add a new property to each movie object
    const topTenMovies = movies.map((movie, index) => ({
      ...movie,
      topTenPosition: index + 1,
    }));
    setMovieData(topTenMovies.slice(0, 10));
  }

  async function fetchTvData() {
    const tvShows = await fetchData(
      "https://api.themoviedb.org/3/trending/tv/day"
    );

    const topTenTvShows = tvShows.map((tvShow, index) => ({
      ...tvShow,
      topTenPosition: index + 1,
    }));
    setTvData(topTenTvShows.slice(0, 10));
  }

  async function fetchAllMovies() {
    const allMovies = await fetchData(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
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
    setSession(session);
    const response = await axios.get(`/api/users/list?email=${email}`);
    setMyList(response.data.list);
  }

  // async function fetchEditorsChoice() {
  //   const response = await axios.get(
  //     `/api/users/list?email=gatchalian.manuel@ymail.com`
  //   );
  //   console.log(response?.data?.list)
  //   setEditorsChoice(response?.data?.list);
  // }

  useEffect(() => {
    const fetchDataAll = async () => {
      setLoading(true);
      try {
        fetchMyList();
        await Promise.all([
          fetchMovieData(),
          fetchTvData(),
          fetchAllTv(),
          fetchAllMovies(),
          // fetchEditorsChoice(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAll();
  }, [page, setMyList]);

  if (loading) return (<Spinner customText={"If the page doesn't load, try reloading the page"}/>);

  return (
    <>
      <Head />
      <NotificationAlert
            status={""}
            text={<>To keep <span class='text-red-600 text-lg font-bold'>YENGFLIX</span><span class='text-yellow-600 text-md !font-[100]'>v3 </span>running smoothly and cover hosting costs, ads is enabled. Thank you for your support and understanding! Streaming is still completely free and it will always stay that way.</>}
          />
      {session?.user?.isVerified === false && (
        <NotificationAlert
          status={"error"}
          text={
            <>
              Your email is not verified. Please verify your email to continue
              full access to YENGFLIX v3's features including streaming. To
              verify click{" "}
              {
                <a
                  className="text-blue-400 font-semibold"
                  href="/account-settings"
                >
                  here.
                </a>
              }
            </>
          }
        />
      )}
      {/* TOP 10 MOVIES */}
      <EmblaCarousel
        slides={movieData}
        options={OPTIONS}
        media_type={"Movies"}
      />

      {/* TOP 10 TV */}
      <EmblaCarousel
        slides={tvData}
        options={OPTIONS}
        media_type={"TV Shows"}
      />

      {/* RECOMMENDED SECTION */}
      <RecommendedCarousel
        slides={allMovies}
        options={OPTIONS}
        media_type={"Movies"}
      />
      <RecommendedCarousel
        slides={allTv}
        options={OPTIONS}
        media_type={"TV Shows"}
      />

      {/* <RecommendedCarousel
            slides={editorsChoice}
            options={OPTIONS}
            media_type={"by Editor"}
          /> */}

      {/* MY LIST SECTION */}
      <MyListCarousel slides={myList} options={OPTIONS} media_type={"Movies"} />
    </>
  );
};

export default HomePage;
