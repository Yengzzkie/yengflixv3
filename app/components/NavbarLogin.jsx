"use client";
import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import Link from "next/link";

export default function NavigationLogin() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen rounded-none border-none px-4 py-4 bg-[#1b1b1b]">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          <span className="text-xl text-[var(--secondary-dark)] tracking-tighter">
            YENGFLIX
          </span>
          <span className="text-xs font-thin text-yellow-500">V3</span>
        </Typography>
        <div className="gap-2 lg:flex">
          <Link href="/login">
            <Button
              className="bg-[var(--secondary-dark)]"
              variant="text"
              size="sm"
              color="blue-gray"
            >
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
