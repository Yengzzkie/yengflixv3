"use client";
import { useMyList } from "../stores/useDataStore";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import SlideInNotifications from "../components/Notification";
import axios from "axios";

const MyListPage = () => {
  const { myList, setMyList } = useMyList();
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const [email, setEmail] = useState("");

  async function fetchMyList() {
    try {
      const session = await getSession();
      const email = session.user.email;
      setEmail(email);

      const response = await axios.get(`/api/users/list?email=${email}`);
      setMyList(response.data.list);
    } catch (error) {
      console.error({ error });
    }
  }

  useEffect(() => {
    fetchMyList();
  }, []);

  async function deleteMovieHandler(id, callback) {
    console.log("ID:", id);
    const response = await axios.delete(
      `/api/users/list?email=${email}&id=${id}`
    );
    callback();
    console.log(response);
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 px-6">
      {/* <SlideInNotifications /> */}
      {myList.map((list) => (
        <div key={list.id} className="relative">
          <Link
            href={`watch/${list.id}?media_type=${
              list.media_type === "movie" ? "Movies" : "TV Shows"
            }&title=${list.title || list.name}`}
          >
            <Image
              src={
                list.poster_path === null
                  ? multimedia
                  : `${IMG_PATH}${list.poster_path}`
              }
              width={300}
              height={300}
              className="card-shadow rounded-md"
              alt={list.title || list.name}
            />
          </Link>
          <TrashIcon
            onClick={() => deleteMovieHandler(list.id, fetchMyList)}
            className="absolute top-4 right-2 w-6 hover:text-red-500 cursor-pointer"
            fill="red"
          />
        </div>
      ))}
    </div>
  );
};

export default MyListPage;
