import { InsertUser } from "../db/schema";
import { SideMenu } from "@/ui-components/sidemenu";

interface DashBoardProp {
  user: InsertUser;
  children?: React.ReactNode;
}

export default function Dashboard({ user, children }: DashBoardProp) {
  return (
    <section className="h-full flex">
      <div className="w-[15rem] p-6 mt-10">
        <SideMenu user={user} />
      </div>
      <div className=" w-full h-screen border bg-[#f5f5f5]">{children}</div>
    </section>
  );
}
