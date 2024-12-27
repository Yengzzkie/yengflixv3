import axios from "axios";

const fetchData = async (URL) => {
  const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY

  try {
    const response = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_API_KEY}`,
      },
    });

    if (!response) {
      throw new Error("HTTP request unsuccessful");
    }
    // console.log(response.data.results)
    return response.data.results;
  } catch (error) {
    console.error({ error });
  }
};

export { fetchData };
