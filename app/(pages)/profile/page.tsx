"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Loader from "@/app/components/loader";
import { useProfileData } from "@/app/hooks/useProfileData";
import { getCookie } from "cookies-next";

export default function Profile() {
  const { client, error, isLoading } = useProfileData();
  const authToken = getCookie("token");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isLoading || !authToken) {
    return <Loader />;
  }

  return (
    <>
      {(error?.message || error?.description) && (
        <div className="mt-8 bg-red-200 p-8 rounded text-center shadow-md">
          <p>Error: {error?.message || error?.description}</p>
        </div>
      )}
      {client && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={client.avatar}
                alt="Client Avatar"
                className="w-16 h-16 object-cover rounded-full mr-4"
                width={100}
                height={100}
              />
              <div>
                <p className="text-xl font-bold">{client.fullName}</p>
                <p className="text-gray-500">{client.email}</p>
              </div>
            </div>
            <div>
              <p className={client.active ? "text-green-500" : "text-red-500"}>
                {client.active ? "Active" : "Inactive"}
              </p>
              <p className="text-lg font-bold">role: {client.role}</p>
            </div>
          </div>
          <div className="mt-8 mb-40">
            <Slider {...sliderSettings}>
              {client.photos.map((photo) => (
                <div key={photo.id}>
                  <Image
                    src={photo.url}
                    alt={photo.name}
                    className="w-full object-cover rounded"
                    style={{ height: "600px" }}
                    width={100}
                    height={100}
                  />
                  <p className="mt-2 text-gray-700">{photo.name}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
