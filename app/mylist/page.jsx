"use client";
import { useMyList } from "../stores/useDataStore";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SlideInNotifications from "../components/Notification";
import axios from "axios";
import TopExpandableCard from "../components/TopExpandableCard";

const MyListPage = () => {
  const { myList, setMyList } = useMyList();
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";
  const [email, setEmail] = useState("");
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [open, setOpen] = useState(false);

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
    const response = await axios.delete(
      `/api/users/list?email=${email}&id=${id}`
    );
    setTimeout(() => {
      callback();
    }, 3000)
  }

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
    setOpen(true);
    console.log(slide)
  };

  return (
    <>
    
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 px-6">
      <TopExpandableCard open={open} setOpen={setOpen} selectedSlide={selectedSlide} media_type={selectedSlide?.title || null ? "Movies" : "TV Shows"} />
        {myList.map((list) => (
          <div key={list.id} className="relative" onClick={() => handleSlideClick(list)}>
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
            <SlideInNotifications title={list.title}
                onTriggerDelete={() => deleteMovieHandler(list.id, fetchMyList)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyListPage;
