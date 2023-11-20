"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { LoginUser } from "@/app/actions/actions";
import { Signup } from "@/app/models/signup";
import { Error } from "@/app/models/error";
import Button from "@/app/components/button";
import Container from "@/app/components/container";
import Input from "@/app/components/input";
import ImageInput from "@/app/components/imageInput";

export default function Login() {
  const [signup, setSignup] = useState<Signup>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    active: false,
    avatar: "",
    photos: [],
  });
  const [success, setSuccess] = useState<String | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await LoginUser(signup);
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
    setSignup({
      ...signup,
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

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSignup({
          ...signup,
          avatar: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotosChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      let updatedPhotos = [...signup.photos];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = ((index) => {
          return () => {
            const base64String = reader.result as string;
            updatedPhotos.push({
              name: `photo ${updatedPhotos.length + 1}`,
              url: base64String,
            });
            if (index === files.length - 1) {
              setSignup({
                ...signup,
                photos: updatedPhotos,
              });
            }
          };
        })(i);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    let photos = [...signup.photos];
    photos.splice(index, 1);
    setSignup({
      ...signup,
      photos: photos,
    });
  };

  return (
    <Container>
      <form
        onSubmit={handleSignup}
        noValidate
        className="bg-gray-100 rounded p-6 h-full flex flex-col items-start shadow-md"
      >
        <h1 className="mb-8 mx-auto text-xl font-bold">Sign up</h1>
        <div className="flex flex-row w-full gap-8">
          <div className="mb-8 flex flex-col w-40 relative">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={signup.firstName}
              placeholder="First name"
              onChange={handleChange}
            />
            {validateInput("firstName")}
          </div>
          <div className="mb-8 flex flex-col w-40 relative">
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={signup.lastName}
              placeholder="Last name"
              onChange={handleChange}
            />
            {validateInput("lastName")}
          </div>
        </div>
        <div className="mb-8 flex flex-col w-full relative">
          <Input
            label="Email"
            type="email"
            name="email"
            value={signup.email}
            placeholder="Email address"
            onChange={handleChange}
          />
          {validateInput("email")}
        </div>
        <div className="mb-8 flex flex-col w-full relative">
          <Input
            label="Password"
            type="password"
            name="password"
            value={signup.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {validateInput("password")}
        </div>
        <div className="w-64 mt-2 flex flex-row justify-between relative">
          <div className="w-36">
            <ImageInput
              label="Avatar"
              name="avatar"
              id="avatar"
              btnText="Upload avatar"
              onChange={handleAvatarChange}
            />
          </div>
          {signup.avatar && (
            <img src={signup.avatar} alt="Selected" className="w-16 h-auto" />
          )}
        </div>
        <div className="w-64 mt-8 flex flex-col justify-between relative">
          <div className="w-36">
            <ImageInput
              label="Photos"
              name="photos"
              id="photos"
              btnText="Upload photos"
              onChange={handlePhotosChange}
              multiple
            />
          </div>
          <div className="flex flex-wrap w-80 mt-5">
            {signup.photos &&
              signup.photos.map((photo, index) => (
                <figure className="relative" key={index}>
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-16 h-10 object-fill mr-2 mb-4"
                  />
                  <img
                    src="/remove.png"
                    alt="remove image"
                    className="absolute -top-3 right-0 w-5 h-auto cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  />
                </figure>
              ))}
          </div>
        </div>
        <div className="mt-10">
          <Button text="Signup" type="submit" />
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
