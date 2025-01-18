import UsersTable from "../components/UsersTable"
import { auth } from "../auth"
import { redirect } from "next/navigation";

const UsersTablePage = async () => {
  const session = await auth();
  
  console.log(session)
  if(!session) {
    redirect("/login")
  } else if(session.user.role !== "ADMIN") { // Redirect to home if user is not admin
    redirect("/")
  }

  return (
    <div>
        <UsersTable />
    </div>
  )
}

export default UsersTablePage