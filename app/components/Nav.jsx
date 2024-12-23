import Navigation from "./Navbar"
import { getServerSession } from "next-auth";

const Nav = async () => {
    const session = await getServerSession();

  return (
    <><Navigation session={session}/></>
  )
}

export default Nav;