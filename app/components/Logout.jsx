import { signOut } from "next-auth/react";
import { Button } from "@material-tailwind/react";
import { redirect } from "next/navigation";

const Logout = async () => {
  async function handleLogout() {
    await signOut();

    redirect("/")
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
