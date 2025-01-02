"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSearchResult } from "../stores/useDataStore";
import { fetchData } from "../utils/fetchData";
import Image from "next/image";
import Link from "next/link";
import multimedia from "../../public/multimedia.png"

const SearchPage = () => {
  const { searchResult, setSearchResult } = useSearchResult();
  const [searchValue, setSearchValue] = useState("");
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const trimmedSearchValue = searchValue.trim();
  
    if (!trimmedSearchValue) {
      return; // avoid unnecessary fetch for empty or whitespace input
    }
  
    const debounceFetch = setTimeout(async () => {
      try {
        const response = await fetchData(
          `https://api.themoviedb.org/3/search/multi?query=${trimmedSearchValue}&include_adult=true&language=en-US&page=1`
        );
        setSearchResult(response);
      } catch (error) {
        console.error({ error });
      }
    }, 800);
  
    return () => clearTimeout(debounceFetch);
  }, [searchValue]);

  console.log(searchResult)
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div className="flex lg:hidden">
        <MagnifyingGlassIcon className="w-8 bg-[var(--primary-light)] pl-2" />
        <input
          type="text"
          className="w-full py-2 px-2 bg-[var(--primary-light)] outline-none"
          placeholder="Search movies, shows..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <XMarkIcon
          className={`${
          searchValue === "" ? "invisible" : "block"
          } absolute w-5 right-1 top-1/2 -translate-y-1/2 cursor-pointer`}
          onClick={() => setSearchValue("")}
        />
      </div>

      <h1 className="text-2xl font-semibold ml-6 mt-6">Search result for &apos;{searchValue}&apos;</h1>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 px-6">
        {searchResult.filter((result) => (result.media_type !== "person")).map((result) => (
          <Link key={result.id} href={`watch/${result.id}?media_type=${result.media_type === "movie" ? "Movies" : "TV Shows"}&title=${result.title || result.name}`}>
            <img src={result.poster_path === null ? (multimedia) : `${IMG_PATH}${result.poster_path}`} width={300} height={300} className="card-shadow rounded-md" alt={result.title || result.name} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchPage;
