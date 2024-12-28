import axios from "axios"
import { getSession } from "next-auth/react";

export default async function addToList(movieData) {
    const session = await getSession();
    const email = session.user.email;

    try {
        const response = await axios.post("/api/users/list", {email: email, newMovie: movieData })
        const data = response.data.message
        return data;
    } catch (error) {
        console.error({ error })
    }
}