import { getUsers } from "@/app/queries/getUser";
import LoginForm from "./login/page";
import Dashboard from "../dashboard";

export default async function AuthServer({ children }: { children: React.ReactNode }) {
  const user = await getUsers();
  if (!user) {
    return <LoginForm />;
  }

  return <Dashboard user={user}>{children}</Dashboard>;
}
