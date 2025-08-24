import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../utils/useOutsideHook";
import { PlayIcon, BookmarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import RatingStar from "./Rating";
import TopTenBadge from "./ui/TopTenBadge";
import addToList from "../utils/addToList";

export default function TopExpandableCard({
  open,
  setOpen,
  selectedSlide,
  media_type,
}) {
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const MonetagSmartlink = "https://otieu.com/4/9697241";
  const ref = useRef(null);
  const isMovie = media_type === "Movies";
  const [added, setAdded] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const [clickedOnce, setClickedOnce] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  useOutsideClick(ref, () => setOpen(false));

  // add-to-list logic
  async function handleAddToList() {
    const newMovie = selectedSlide;

    try {
      const response = await addToList(newMovie);
      setButtonText(response);
      setAdded(true);
    } catch (error) {
      console.error({ error });
    }

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  const handleClick = (e) => {
    if (!clickedOnce) {
      e.preventDefault(); // prevent default navigation on first click
      window.open(MonetagSmartlink, "_blank", "noopener,noreferrer");
      setClickedOnce(true);
    }
    // on subsequent clicks, normal href navigation will happen
  };

  console.log({ selectedSlide });

  return (
    <AnimatePresence>
      {open && selectedSlide && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            layoutId={`card-${selectedSlide.title}`}
            ref={ref}
            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 sm:rounded-3xl z-[101]"
          >
            <motion.button
              key={`button-${selectedSlide.title}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div layoutId={`image-${selectedSlide.title}`}>
              <img
                width={200}
                height={200}
                src={`${IMG_PATH}${selectedSlide.backdrop_path}`}
                alt={selectedSlide.title}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
              />
            </motion.div>

            <div className="overflow-x-scroll">
              <div className="flex justify-between items-start p-4">
                <div className="w-full">
                  {/* LOGO */}
                  <div className="flex items-center">
                    <span className="font-extrabold text-[var(--secondary-dark)] text-2xl">
                      Y
                    </span>{" "}
                    <span className="font-semibold text-xs text-gray-400 leading-4 tracking-[3px] ml-1">
                      FILM
                    </span>
                  </div>

                  {/* TITLE */}
                  <motion.h3
                    layoutId={`title-${selectedSlide.title}`}
                    className="font-bold text-neutral-200 text-2xl"
                  >
                    {isMovie ? selectedSlide.title : selectedSlide.name}
                  </motion.h3>

                  {/* RATING STAR */}
                  <RatingStar
                    rating={selectedSlide.vote_average}
                    votes={selectedSlide.vote_count}
                  />

                  {/* META DATA */}
                  <div className="my-1 flex items-center py-1">
                    <span className="text-xs mr-3">
                      {isMovie
                        ? selectedSlide.release_date
                        : selectedSlide.first_air_date}
                    </span>
                    <span className="bg-gray-700 text-gray-300 text-xs p-[3px] rounded-sm mr-3">
                      {selectedSlide.adult ? "18+" : "PG-13"}
                    </span>
                    <span className="bg-gray-700 text-gray-300 text-xs p-[3px] rounded-sm mr-3">
                      1080p
                    </span>
                    <span className="border border-gray-500 text-gray-300 text-xs p-[2px] rounded-sm mr-3">
                      {media_type}
                    </span>
                  </div>

                  {/* TOP 10 BADGE */}
                  {selectedSlide.topTenPosition && (
                    <div className="flex items-center">
                      <TopTenBadge />
                      {selectedSlide.topTenPosition && (
                        <span className="ml-2 text-sm font-semibold text-[var(--primary-content)]">
                          #{selectedSlide.topTenPosition} in {media_type} Today
                        </span>
                      )}
                    </div>
                  )}

                  {/* PLAY BUTTON */}
                  <motion.a
                    href={`/watch/${
                      selectedSlide.id
                    }?media_type=${media_type}&title=${
                      selectedSlide?.title || selectedSlide?.name
                    }`}
                    onClick={handleClick}
                    className="flex justify-center items-center px-4 py-2 my-3 text-sm rounded-[3px] font-bold bg-white hover:bg-[var(--secondary-dark)] hover:text-white text-[var(--primary-dark)] w-full text-center"
                  >
                    <PlayIcon className="w-4 mr-1" /> Play
                  </motion.a>

                  {/* BOOKMARK ICON */}
                  <motion.a
                    onClick={() => handleAddToList()}
                    // href={`/watch/${selectedSlide.id}?media_type=${media_type}`}
                    className="flex justify-center items-center px-4 py-2 my-3 text-sm rounded-[3px] font-bold bg-[var(--primary-dark)] hover:bg-[var(--secondary-dark)] text-[var(--primary)] w-full text-center"
                  >
                    {!added ? (
                      <div className="flex items-center cursor-pointer">
                        <BookmarkIcon className="w-4 mr-1" />
                        <span>Add To List</span>
                      </div>
                    ) : (
                      <div className="flex items-center cursor-pointer">
                        <CheckIcon className="w-4 mr-1" />
                        <span>{buttonText}</span>
                      </div>
                    )}
                  </motion.a>

                  {/* OVERVIEW */}
                  <p className="px-1.5 py-2 text-xs text-zinc-400">
                    <p className="text-zinc-500">Overview:</p>
                    {selectedSlide.overview}
                  </p>
                </div>
              </div>

              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {typeof selectedSlide.content === "function"
                    ? selectedSlide.content()
                    : selectedSlide.content}
                </motion.div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
