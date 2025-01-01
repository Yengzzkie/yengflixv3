"use client";
import { useEffect, useState } from "react";
import { useMyList } from "../stores/useDataStore";
import { getSession } from "next-auth/react";
import { CustomSpinner } from "../components/Spinner";
import TopExpandableCard from "../components/TopExpandableCard";
import SlideInNotifications from "../components/Notification";
import axios from "axios";

const MyListPage = () => {
  const [email, setEmail] = useState("");
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { myList, setMyList } = useMyList();
  const IMG_PATH = "https://image.tmdb.org/t/p/original/";

  async function fetchMyList() {
    setLoading(true);
    try {
      const session = await getSession();
      const email = session.user.email;
      setEmail(email);

      const response = await axios.get(`/api/users/list?email=${email}`);
      setMyList(response.data.list);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
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
    }, 3000);
  }

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
    setOpen(true);
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : myList.length === 0 ? (
        <div className="h-[90vh] w-screen flex justify-center items-center">
          <p className="text-2xl font-bold text-center">Your List is Empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 px-6">
          <TopExpandableCard
            open={open}
            setOpen={setOpen}
            selectedSlide={selectedSlide}
            media_type={selectedSlide?.title || null ? "Movies" : "TV Shows"}
          />
          {myList.map((list) => (
            <div
              key={list.id}
              className="relative cursor-pointer"
              onClick={() => handleSlideClick(list)}
            >
              <img
                src={
                  list.poster_path === null
                    ? multimedia
                    : `${IMG_PATH}${list.poster_path}`
                }
                // width={300}
                // height={300}
                className="card-shadow rounded-md"
                alt={list.title || list.name}
              />
              <SlideInNotifications
                title={list.title}
                onTriggerDelete={() => deleteMovieHandler(list.id, fetchMyList)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyListPage;
