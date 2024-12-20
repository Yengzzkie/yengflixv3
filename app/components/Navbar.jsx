"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
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
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const navListMenuItems = [
  {
    title: "Browse Movies",
    description: "Find the perfect solution for your needs.",
    icon: VideoCameraIcon,
  },
  {
    title: "Browse TV Shows",
    description: "Find the perfect solution for your needs.",
    icon: TvIcon,
  },
  {
    title: "My List",
    description: "Learn how we can help you achieve your goals.",
    icon: BookmarkIcon,
  },
  {
    title: "Users",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Forum",
    description: "Reach out to us for assistance or inquiries",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "Account Settings",
    description: "Find the perfect solution for your needs.",
    icon: Cog6ToothIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
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
              className="text-xs !font-medium text-blue-gray-500 text-[#a7a7a7]"
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
          <Link href="/">Home</Link>
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="div"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <Link href="/browse-movies">Browse Movies</Link>
        </ListItem>
      </Typography>
    </List>
  );
}

export default function Navigation() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen rounded-none border-none px-4 py-4 bg-[var(--primary-dark)]">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          <span className="text-xl text-[var(--secondary-dark)]">YENGFLIX</span>
          <span className="text-sm text-yellow-500">V3</span>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button
            className="bg-[var(--secondary-dark)]"
            variant="text"
            size="sm"
            color="blue-gray"
          >
            Log In
          </Button>
          <Link href="/signup">
            <Button
              className="bg-[var(--secondary-dark)]"
              variant="gradient"
              size="sm"
            >
              Sign In
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
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button
            className="bg-[var(--secondary-dark)]"
            variant="gradient"
            size="sm"
            color="blue-gray"
            fullWidth
          >
            Log In
          </Button>

          <Button
            className="bg-[var(--secondary-dark)]"
            variant="gradient"
            size="sm"
            fullWidth
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
