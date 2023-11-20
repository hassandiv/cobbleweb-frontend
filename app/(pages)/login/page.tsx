"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { LoginUser } from "@/app/actions/actions";
import { Login } from "@/app/models/login";
import { Error } from "@/app/models/error";
import Button from "@/app/components/button";
import Container from "@/app/components/container";
import Input from "@/app/components/input";

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
    } catch (error: any) {
      setError(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = (field: string) => {
    return (
      error?.errors &&
      error?.errors.map((error) => (
        <small className="text-red-600 mt-1 absolute top-16" key={error.field}>
          {field === error.field && error.message}
        </small>
      ))
    );
  };

  return (
    <Container>
      <form
        onSubmit={handleLogin}
        noValidate
        className="bg-gray-100 rounded p-6 h-96 flex flex-col items-start shadow-md"
      >
        <h1 className="mb-8 mx-auto text-xl font-bold">Login</h1>
        <div className="mb-8 flex flex-col w-full relative">
          <Input
            label="Email"
            type="email"
            name="email"
            value={login.email}
            placeholder="Enter your email address"
            onChange={handleChange}
          />
          {validateInput("email")}
        </div>
        <div className="mb-8 flex flex-col w-full relative">
          <Input
            label="Password"
            type="password"
            name="password"
            value={login.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          {validateInput("password")}
        </div>
        <div className="mt-10">
          <Button text="Login" type="submit" />
        </div>
      </form>
      {(error?.message || error?.description) && (
        <div className="mt-8 bg-red-200 p-8 rounded text-center shadow-md">
          <p>Error: {error?.message || error?.description}</p>
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
