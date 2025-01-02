"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  VideoCameraIcon,
  TvIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  Cog6ToothIcon,
  RectangleGroupIcon,
  TagIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Logout from "./Logout";
import { fetchData } from "../utils/fetchData";
import { useRouter } from "next/navigation";
import { useSearchResult } from "../stores/useDataStore";
import { VerifiedBadge, NotVerifiedBadge } from "./VerifiedBadge";
import { Tooltip } from "@material-tailwind/react";

const navListMenuItems = [
  {
    title: "Browse Movies",
    description: "Explore a wide variety of movies from all genres.",
    icon: VideoCameraIcon,
    link: "/browse-movies",
  },
  {
    title: "Browse TV Shows",
    description: "Discover the latest and most popular TV shows to watch.",
    icon: TvIcon,
    link: "/browse-tv%20shows",
  },
  {
    title: "My List",
    description: "Save your favorite movies and TV shows for easy access later.",
    icon: BookmarkIcon,
    link: "/mylist",
  },
  {
    title: "Users",
    description: "Manage user profiles and interact with other members.",
    icon: UserGroupIcon,
    link: "/users",
  },
  {
    title: "Forum",
    description: "Join the community discussion, ask questions, and share ideas.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "Account Settings",
    description: "Update your personal information and adjust account preferences.",
    icon: Cog6ToothIcon,
  },
  // {
  //   title: "News",
  //   description: "Read insightful articles, tips, and expert opinions.",
  //   icon: NewspaperIcon,
  // },
  // {
  //   title: "Products",
  //   description: "Find the perfect solution for your needs.",
  //   icon: RectangleGroupIcon,
  // },
  // {
  //   title: "Special Offers",
  //   description: "Explore limited-time deals and bundles",
  //   icon: TagIcon,
  // },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, link }, key) => (
      <a href={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-l p-6 hover:bg-[var(--primary-dark)]">
          <div className="flex items-center justify-center rounded-lg p-2">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-200 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              className="flex items-center text-sm font-bold text-[var(--primary)]"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs text-left !font-medium text-blue-gray-500 text-[#a7a7a7]"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden border shadow-lg bg-[var(--background)] text-[var(--primary)] max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="div"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <Link onClick={() => setOpenNav(!openNav)} href="/">
            Home
          </Link>
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="div"
        variant="small"
        color="blue-gray"
        className="font-medium lg:hidden"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <Link onClick={() => setOpenNav(!openNav)} href="/search">
            Search Title
          </Link>
        </ListItem>
      </Typography>
    </List>
  );
}

export default function Navigation({ session }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const { setSearchResult } = useSearchResult();
  const router = useRouter();

  const country = session.user.location.countryCode.toLowerCase();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    return () =>
      window.removeEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
  }, []);

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
        router.push(`/search?title=${searchValue}`);
      } catch (error) {
        console.error({ error });
      }
    }, 800);

    return () => clearTimeout(debounceFetch);
  }, [searchValue, router]);

  return (
    <Navbar className="mx-auto max-w-screen rounded-none border-none px-4 py-4 bg-[#1b1b1b]">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Logo */}
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

        {/* Navigation */}
        <div className="hidden lg:block mr-auto ml-6">
          <NavList />
        </div>

        {/* Search and User Info */}
        <div className="hidden gap-2 lg:flex items-center">
          {/* SEARCH BAR */}
          <div
            className={`flex relative h-8 mr-2 ${
              openSearch ? "bg-[var(--primary-dark)]" : "bg-transparent"
            } ${
              openSearch ? "border" : "border-none"
            } transition-all duration-1000`}
          >
            <MagnifyingGlassIcon
              fill="white"
              className="p-1 cursor-pointer"
              onClick={() => {
                setOpenSearch(!openSearch);
                setSearchValue("");
              }}
            />
            <input
              type="text"
              value={searchValue}
              placeholder="Search movies or TV shows..."
              onChange={(e) => setSearchValue(e.target.value)}
              className={`${
                openSearch ? "w-52 px-2" : "w-0 px-0"
              } transition-all duration-1000 rounded-sm outline-none bg-[var(--primary-light)] text-sm`}
            />
            <XMarkIcon
              className={`${
                searchValue === "" ? "invisible" : "block"
              } absolute w-5 right-1 top-1/2 -translate-y-1/2 cursor-pointer`}
              onClick={() => setSearchValue("")}
            />
          </div>

          {/* USER DISPLAY NAME */}
          <div className="mr-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-400 flex items-end">
                Hello,{" "}
                <span className="font-semibold mx-1">{session.user.name}</span>
              </span>
              {session.user.isVerified ? (
                <VerifiedBadge />
              ) : (
                <NotVerifiedBadge />
              )}
              <img
                src={`/flags/${country}.png`}
                alt="flag"
                className="w-6 h-4 ml-1"
              />
            </div>
            <p className="text-[11px] text-gray-400">{session.user.email}</p>
          </div>

          <Logout />
        </div>

        {/* Mobile User Info */}
        <div className="block mr-0 lg:hidden lg:mr-4">
          <div className="flex items-center">
            <span className="text-xs text-gray-400 flex items-center max-w-[130px]">
              Hello,{" "}
              <Tooltip // added tooltip for truncated display names
                content={session.user.name}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="bg-[var(--primary-dark)] card-shadow"
              >
                <span className="font-semibold mx-1 truncate">
                  {session.user.name}
                </span>
              </Tooltip>
            </span>
            {session.user.isVerified ? <VerifiedBadge /> : <NotVerifiedBadge />}
            <img
              src={`/flags/${country}.png`}
              alt="flag"
              className="w-5 h-3 lg:w-6 lg:h-4 ml-1"
            />
          </div>
          <p className="text-[11px] text-gray-400">{session.user.email}</p>
        </div>

        {/* Mobile Navigation Toggle */}
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

      {/* Collapsible Navigation for Mobile */}
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Logout />
        </div>
      </Collapse>
    </Navbar>
  );
}
