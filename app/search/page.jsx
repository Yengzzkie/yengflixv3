"use client"
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchPage = () => {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div className="flex">
        <MagnifyingGlassIcon className="w-8 bg-[var(--primary-light)] pl-2" />
        <input
          type="text"
          className="w-full py-2 px-2 bg-[var(--primary-light)] outline-none"
          placeholder="Search movies, shows..."
        />
      </div>
    </motion.div>
  );
};

export default SearchPage;
