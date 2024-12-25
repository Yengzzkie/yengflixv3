import Video from "@/app/components/Video";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

const VideoPlayer = async ({ params }) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <>
      <Video params={params} />
    </>
  );
};

export default VideoPlayer;
