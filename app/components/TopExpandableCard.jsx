import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../lib/useOutsideHook";
import RatingStar from "./Rating";

export default function TopExpandableCard({ open, setOpen, selectedSlide, media_type }) {
    const IMG_PATH = "https://image.tmdb.org/t/p/original/";
    const ref = useRef(null);
  
    useEffect(() => {
      function onKeyDown(event) {
        if (event.key === "Escape") {
          setOpen(false); // Close on Escape key
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
  
    useOutsideClick(ref, () => setOpen(false)); // Close on outside click
  
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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden z-[101]"
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
  
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${selectedSlide.title}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {selectedSlide.title}
                    </motion.h3>
  
                    <RatingStar
                      rating={selectedSlide.vote_average}
                      votes={selectedSlide.vote_count}
                    />
  
                    <motion.p
                      layoutId={`description-${selectedSlide.description}`}
                      className="text-neutral-500 font-extralight mr-4 mt-2"
                    >
                      {selectedSlide.overview}
                    </motion.p>
                  </div>
  
                  <motion.a
                    layoutId={`button-${selectedSlide.title}`}
                    href={`/watch/${selectedSlide.id}?media_type=${media_type}`}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Play
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
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
