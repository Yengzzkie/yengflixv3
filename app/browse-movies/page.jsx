"use client";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import Pagination from "../components/Pagination";
import TopExpandableCard from "../components/TopExpandableCard";
import axios from "axios";

const MoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [open, setOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [includeAdult, setIncludeAdult] = useState(false);
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";

  async function fetchMovies() {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=${includeAdult}&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );
      setTotalPages(response?.data?.total_pages);
      setMovies(response?.data?.results);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [currentPage, includeAdult]);

  function pageChangeHandler(page) {
    setCurrentPage(page);
  }

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
    setOpen(true);
  };

  return (
    <>
      <TopExpandableCard
        open={open}
        setOpen={setOpen}
        selectedSlide={selectedSlide}
        media_type={selectedSlide?.title || null ? "Movies" : "TV Shows"}
      />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="pagination bg-transparent sticky top-0 flex flex-col lg:flex-row justify-between items-center mr-2 mb-2 px-4 py-2">
            <h1 className="text-2xl font-bold ml-2 mb-2 text-shadow-dark">
              Browse Movies
            </h1>
            <label>
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={() => setIncludeAdult(!includeAdult)}
              />
              <span className="italic text-red-400 ml-2">Include Adult (18+)</span>
            </label>
            <Pagination
              totalPages={totalPages}
              onPageChange={pageChangeHandler}
              currentPage={currentPage}
            />
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-5 px-2 gap-4">
            {movies.map((movie) => (
              <img
                className="card-shadow rounded-md cursor-pointer"
                key={movie.id}
                src={`${IMG_PATH}${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                onClick={() => handleSlideClick(movie)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MoviesPage;
