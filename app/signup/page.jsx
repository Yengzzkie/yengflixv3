import SignupForm from "../components/SignUpForm";
import { redirect } from "next/navigation";
import { auth } from "../auth";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/")
  }

  return (
    <div className="signup-background min-h-[90vh] relative bg-[url('/signupbg.jpg')] lg:py-10">
      <SignupForm />
    </div>
  );
};

export default page;
