import axios from "axios";

const fetchData = async (URL) => {
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

  try {
    const response = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!response) {
      throw new Error("HTTP request unsuccessful");
    }

    return response.data.results;
  } catch (error) {
    console.error({ error });
  }
};

export { fetchData };
