const VideoPlayer = async ({ params }) => {
  const { id } = await params;

  return <div>
    Fetch data here
    <p>ID: {id}</p>
  </div>;
};

export default VideoPlayer;
