"use server";

import { cookies, headers } from "next/headers";
import { db } from "@/app/db";
import { InsertUser, userTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, setSession, comparePassword } from "@/lib/session";

export async function signUpFormAction(prevState: unknown, formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const ip = (await headers().get("x-real-ip")) ?? "local";

    console.log({ ip, username });

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        message: "Username already taken",
      };
    }

    const passwordHash = await hashPassword(password);

    const newUser: InsertUser = {
      username,
      passwordHash,
    };

    const [createUser] = await db.insert(userTable).values(newUser).returning();

    if (!createUser) {
      return { message: "Failed to create user please try again" };
    }

    await setSession(createUser);

    return {
      message: `user ${createUser.username}  sign up succesfully!`,
    };
  } catch (error) {
    return {
      message: `Failed to create user ${error}`,
    };
  }
}

export async function signInFormAction(prevState: unknown, formData: FormData) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const ip = (await headers().get("x-real-ip")) ?? "local";

    console.log({ ip, username });

    const user = await db
      .select({
        user: userTable,
      })
      .from(userTable)
      .where(eq(userTable.username, username))
      .limit(1);

    if (user.length === 0) {
      return {
        message: "Invalid username of password. Please try again",
      };
    }

    const { user: foundUser } = user[0];

    const isPasswordValid = await comparePassword(password, foundUser.passwordHash);

    if (!isPasswordValid) {
      return {
        message: "Invalid username or password. Please try again",
      };
    }

    await setSession(foundUser);

    return {
      message: `User ${foundUser.username} successfully logged in`,
    };
  } catch (error) {
    return {
      message: `Failed to create user ${error}`,
    };
  }
}

export async function signOutAction() {
  const clear = await cookies();

  clear.getAll().forEach((cookie) => clear.delete(cookie.name));
}
