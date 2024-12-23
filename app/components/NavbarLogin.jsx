"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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
        <div className="hidden gap-2 lg:flex">
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

          <Link href="/signup">
            <Button
              className="bg-[var(--secondary-dark)]"
              variant="gradient"
              size="sm"
            >
              Sign Up
            </Button>
          </Link>
        </div>
        <IconButton
          variant="text"
          className="lg:hidden w-12"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
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

          <Link href="/signup">
            <Button
              className="bg-[var(--secondary-dark)]"
              variant="gradient"
              size="sm"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}
