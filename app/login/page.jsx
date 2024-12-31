import LoginForm from "../components/LoginForm";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const session = auth();

  if(session) {
    redirect("/")
  }
  
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
