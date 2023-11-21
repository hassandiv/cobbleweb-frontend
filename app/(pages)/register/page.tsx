"use client";

import { useState } from "react";
import { Signup } from "@/app/actions/actions";
import { ISignup } from "@/app/models/signup";
import { Error } from "@/app/models/error";
import Button from "@/app/components/button";
import Container from "@/app/components/container";
import Input from "@/app/components/input";
import ImageInput from "@/app/components/imageInput";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Register() {
  const initialSignupState: ISignup = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "client",
    active: false,
    avatar: "",
    photos: [],
  };
  const [signup, setSignup] = useState<ISignup>(initialSignupState);
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await Signup(signup);
      if (response.message) {
        router.push("/success");
        setError(undefined);
        setSignup(initialSignupState);
      }
      if (response.error) {
        setError(response.error);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({
      ...signup,
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
        <h1 className="mb-8 mx-auto text-xl font-bold">Register new user</h1>
        <small className="mb-4">Fields marked with * are mandatory</small>
        <div className="flex flex-col sm:flex-row w-full sm:gap-5">
          <div className="mb-8 flex flex-col w-full sm:w-44 relative">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={signup.firstName}
              placeholder="First name"
              onChange={handleChange}
              required={true}
            />
            {validateInput("firstName")}
          </div>
          <div className="mb-8 flex flex-col w-full sm:w-44 relative">
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={signup.lastName}
              placeholder="Last name"
              onChange={handleChange}
              required={true}
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
            required={true}
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
            required={true}
          />
          {validateInput("password")}
        </div>
        <div className="w-64 mb-8 flex flex-row justify-between relative">
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
            <Image
              src={signup.avatar}
              alt="Selected"
              className="w-16 h-auto object-cover"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="w-full flex flex-col justify-between relative">
          <div className="w-36">
            <ImageInput
              label="Photos"
              name="photos"
              id="photos"
              btnText="Upload photos"
              onChange={handlePhotosChange}
              required={true}
              multiple
            />
            {signup?.photos.length < 4 && validateInput("photos")}
          </div>
          <div className="flex flex-wrap w-80 mt-10">
            {signup.photos &&
              signup.photos.map((photo, index) => (
                <figure className="relative" key={index}>
                  <Image
                    src={photo.url}
                    alt={photo.name}
                    className="w-16 h-10 object-cover mr-2 mb-4"
                    width={100}
                    height={100}
                  />
                  <Image
                    src="/remove.png"
                    alt="remove image"
                    className="absolute -top-3 right-0 w-5 h-auto cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                    width={100}
                    height={100}
                  />
                </figure>
              ))}
          </div>
        </div>
        <div className="mt-10">
          <Button text="Submit" type="submit" />
        </div>
      </form>
      {(error?.message || error?.description) && (
        <div className="mt-8 bg-red-200 p-8 rounded text-center shadow-md">
          <p>Error: {error?.message || error?.description}</p>
        </div>
      )}
    </Container>
  );
}
