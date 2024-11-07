import { cookies } from "next/headers";
import { verifyToken } from "../../lib/session";
import { db } from "../db/index";
import { userTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  try {
    const sessionCookie = await cookies().get("session");

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    const sessionData = await verifyToken(sessionCookie.value);

    if (!sessionData || !sessionData.user || typeof sessionData.user.id !== "number") {
      return null;
    }

    if (new Date(sessionData.expires) < new Date()) {
      return null;
    }

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, sessionData.user.id))
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    console.log(error);
  }
};
