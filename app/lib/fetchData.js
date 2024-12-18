import axios from "axios";

const fetchData = async (URL) => {
  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTkwMGIwZmVhZjZjZjVkMjk0MDc1YjAxNDRkMmZiYSIsInN1YiI6IjY2MTA4NDQ1NWIzNzBkMDE3MDYzMzFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r2V8Oru9xaAu4JLQPZw_nqv_lVULwa-ZPfq8ruQHwvg";

  try {
    const response = await axios.get(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response) {
      throw new Error("HTTP request unsuccessful");
    }
    console.log(response.data.results)
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export { fetchData };
