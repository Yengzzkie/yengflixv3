import Video from "@/app/components/Video";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const VideoPlayer = async ({ params }) => {
  const session = await getServerSession()

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
