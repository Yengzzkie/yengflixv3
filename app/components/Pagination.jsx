import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export default function Pagination({ totalPages, onPageChange, currentPage }) {
 
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1)
  };
 
  const prev = () => {
    if (currentPage === 1) return;
 
    onPageChange(currentPage - 1)
  };
 
  return (
    <div className="flex items-center justify-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={currentPage === 1}
        className="flex justify-center self-center hover:bg-[var(--secondary-dark)]"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-300">{currentPage}</strong> of{" "}
        <strong className="text-gray-00">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={currentPage === totalPages}
        className="flex justify-center hover:bg-[var(--secondary-dark)]"
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
      </IconButton>
    </div>
  );
}