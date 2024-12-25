import { signOut } from "next-auth/react";
// import { signOut } from "../auth";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  async function handleLogout() {
    await signOut();

    router.push('/login')
    router.refresh();
    // redirect("/login")
  }

  return (
    <>
      <Button
        className="bg-[var(--secondary-dark)] px-3 py-2"
        onClick={() => {
          handleLogout();
        }}
      >
        Log out
      </Button>
    </>
  );
};

export default Logout;