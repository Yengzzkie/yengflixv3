import { auth } from "../auth";
import Settings from "../components/Settings";
import { redirect } from "next/navigation";

const AccountSettingsPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login")
  }

  return (
    <div>
      <Settings user={session.user} />
    </div>
  )
}

export default AccountSettingsPage;