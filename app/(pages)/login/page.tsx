"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { LoginUser } from "../../actions/actions";
import { Login } from "../../models/login";
import { Error } from "../../models/error";
import Button from "../../components/button";
import Container from "../../components/container";

export default function Login() {
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState<String | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await LoginUser(login);
      if (response.token) {
        setCookie("token", response.token);
        setSuccess(response.message);
        router.push("/account");
        setError(undefined);
      }
      if (response.error) {
        setError(response.error);
        setSuccess(undefined);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = (field: string) =>
    error?.errors &&
    error?.errors.map((error) => (
      <small className="text-red-600 mt-1 absolute top-16" key={error.field}>
        {field === error.field && error.message}
      </small>
    ));

  return (
    <Container>
      <form
        onSubmit={handleLogin}
        noValidate
        className="bg-gray-100 rounded p-6 h-96 flex flex-col items-start shadow-md"
      >
        <h1 className="mb-8 mx-auto text-xl font-bold">Login</h1>
        <div className="mb-8 flex flex-col w-full relative">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={login.email}
            placeholder="Enter your email address"
            onChange={handleChange}
            className="border border-teal-600 rounded p-1 mt-1 outline-none"
          />
          {validateInput("email")}
        </div>
        <div className="mb-8 flex flex-col w-full relative">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={login.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="border border-teal-600 rounded p-1 mt-1 outline-none"
          />
          {validateInput("password")}
        </div>
        <div className="mt-10">
          <Button text="Login" type="submit" />
        </div>
      </form>
      {error?.description && (
        <div className="mt-8 bg-red-200 p-8 rounded text-center shadow-md">
          <p>{error?.description}</p>
        </div>
      )}
      {success && (
        <div className="mt-8 bg-green-200 p-8 rounded text-center shadow-md">
          <p>{success}</p>
        </div>
      )}
    </Container>
  );
}
