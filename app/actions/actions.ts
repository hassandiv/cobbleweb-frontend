"use server";

import { Login } from "@/app/models/login";
import { Signup } from "@/app/models/signup";
import { ClientDetails } from "@/app/models/client";
import { cookies } from "next/headers";

export async function Signup(request: Signup) {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_COBBLEWEB_API_BASE_URL}register`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     cache: "no-cache",
    //     body: JSON.stringify(request),
    //   }
    // );
    // const data = await response?.json();
    // return data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function LoginUser({ email, password }: Login) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COBBLEWEB_API_BASE_URL}login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response?.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function Me() {
  const nextCookies = cookies();
  const token = nextCookies.get("token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COBBLEWEB_API_BASE_URL}/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token?.value ? `Bearer ${token?.value}` : "",
        },
        cache: "no-cache",
      }
    );
    const data = await response?.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}
