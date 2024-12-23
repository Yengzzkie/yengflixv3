import SignupForm from "../components/SignUpForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="signup-background min-h-[90vh] relative bg-[url('https://i.ibb.co/vXqDmnh/background.jpg')] lg:py-10">
      <SignupForm />
    </div>
  );
};

export default page;
