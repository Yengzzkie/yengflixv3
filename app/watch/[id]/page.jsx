'use client'
import { useSearchParams } from "next/navigation";
import { use } from "react";

const VideoPlayer = ({ params }) => {
  const idParams = use(params);
  const id = idParams.id
  const mediaType = useSearchParams().get('media_type');
  const movieSrc = `https://vidsrc.xyz/embed/movie/${id}`
  const tvSrc = `https://vidsrc.xyz/embed/tv/${id}`

  return <div>

    <iframe src={mediaType === "Movies" ? movieSrc : tvSrc} className="w-screen h-[50vh] lg:h-screen" allowFullScreen={true} referrerPolicy="origin"></iframe>
    <p>ID: {id}</p>
    {mediaType}
  </div>;
};

export default VideoPlayer;
