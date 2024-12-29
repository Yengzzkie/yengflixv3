import UsersTable from "../components/UsersTable"
import { auth } from "../auth"
import { redirect } from "next/navigation";

const UsersTablePage = async () => {
  const session = await auth();
  
  if(!session) {
    redirect("/login")
  }

  return (
    <div>
        <UsersTable />
    </div>
  )
}

export default UsersTablePage