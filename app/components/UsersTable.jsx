"use client";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";

const TABLE_HEAD = ["Name", "Location", "Email Verified", "Joined", ""];

export default function UsersTable() {
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // fetch users
  async function getAllUsers() {
    try {
      const response = await axios.get("/api/users");
      setTABLE_ROWS(response.data); // keep the original data
      setFilteredUsers(response.data); // set the data here for filtering
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  // handle search input change
  function handleSearchInput(event) {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    // filter users dynamically based on search input
    const filtered = TABLE_ROWS.filter(user =>
      user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  }

  // clear search
  function clearSearch() {
    setSearchValue("");
    setFilteredUsers(TABLE_ROWS);
  }

  return (
    <Card className="h-full w-full rounded-none bg-[var(--primary-dark)]">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-[var(--primary-dark)] p-4"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            {/* Search Bar */}
            <div className={`flex relative h-8 mr-2 bg-[var(--primary-dark)] border`}>
              <MagnifyingGlassIcon className="p-1 cursor-pointer" />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchInput}
                placeholder="Search user..."
                className={`w-full px-2 transition-all duration-1000 rounded-sm outline-none bg-[var(--primary-light)]`}
              />
              <XMarkIcon
                className={`${searchValue === "" ? "invisible" : "block"} absolute w-5 right-1 top-1/2 -translate-y-1/2 cursor-pointer`}
                onClick={clearSearch}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <Typography variant="small" color="blue-gray" className="font-normal pl-2">
        Showing {filteredUsers.length} user(s)
      </Typography>

      <CardBody className="overflow-scroll px-0 p-0 scrollbar-none">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(
              ({ id, name, email, location, isVerified, createdAt }) => {
                const joinDate = new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                });
                return (
                  <tr key={id}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                          alt={name}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {name}
                          </Typography>
                          <Typography color="blue-gray" className="font-normal text-sm opacity-70">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{location.countryName}</td>
                    <td className="p-4">
                      {isVerified ? <span className="font-medium text-sm text-[var(--secondary-content)] bg-green-300 border border-[var(--secondary-content)] rounded-full py-1 px-2">Verified</span> : <span className="font-medium text-sm text-[var(--secondary-dark)] bg-red-300 border border-red-500 rounded-full py-1 px-2">Not Verified</span>}
                      {/* <Chip
                        variant="ghost"
                        size="sm"
                        value={isVerified ? "Verified" : "Not Verified"}
                        color={isVerified ? "green" : "blue-gray"}
                      /> */}
                    </td>
                    <td className="p-4">{joinDate}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
