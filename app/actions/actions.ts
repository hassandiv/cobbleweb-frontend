"use server";

import { Login } from "../models/login";

export async function Register() {
  return; //
}

export async function LoginUser({ email, password }: Login) {
  try {
    const data = await fetch(
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
    const response = await data?.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function Me() {
  return; //
}
