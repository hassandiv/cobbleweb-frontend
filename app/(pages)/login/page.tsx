"use client";

import { Login } from "@/app/models/login";
import Button from "@/app/components/button";
import Container from "@/app/components/container";
import Input from "@/app/components/input";
import { useLoginForm } from "@/app/hooks/useLoginForm";

export default function Login() {
  const { login, success, error, handleLogin, handleChange } = useLoginForm();

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
        className="rounded-lg flex flex-col items-start shadow-lg justify-center bg-cover"
        style={{ backgroundImage: 'url("/3184468.jpg")' }}
      >
        <div className="bg-white w-80 mx-auto my-5 md:my-0 md:w-1/2 p-6 md:ml-auto md:mr-0 rounded-tr-lg rounded-br-lg">
          <h1 className="mb-8 mx-auto text-2xl font-bold">Login</h1>
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
