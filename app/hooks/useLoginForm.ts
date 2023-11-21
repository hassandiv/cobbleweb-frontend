import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { LoginUser } from "@/app/actions/actions";
import { Login } from "@/app/models/login";
import { Error } from "@/app/models/error";

export const useLoginForm = () => {
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await LoginUser(login);
      if (response.token) {
        setCookie("token", response.token);
        setSuccess(response.message);
        setError(undefined);
        router.push("/profile");
        router.refresh();
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

  return {
    login,
    success,
    error,
    handleLogin,
    handleChange,
  };
};
