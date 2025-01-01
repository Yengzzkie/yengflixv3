"use client";
import { useEffect, useState } from "react";
import { CustomSpinner } from "../components/Spinner";
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
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";

  async function fetchMovies() {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
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
  }, [currentPage]);

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
        <CustomSpinner />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row justify-between items-center mr-2 mt-4 mb-2">
            <h1 className="text-2xl font-bold ml-2 mb-2">Browse Movies</h1>
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
