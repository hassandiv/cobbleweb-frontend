import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterUser } from "@/app/actions/actions";
import { Register } from "@/app/models/register";
import { Error } from "@/app/models/error";

export const useRegisterForm = () => {
  const initialSignupState: Register = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "client",
    active: false,
    avatar: "",
    photos: [],
  };
  const [signup, setSignup] = useState<Register>(initialSignupState);
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await RegisterUser(signup);
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

  return {
    signup,
    error,
    handleRegister,
    handleChange,
    handleAvatarChange,
    handlePhotosChange,
    handleRemoveImage,
  };
};
