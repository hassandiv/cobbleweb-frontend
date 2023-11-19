"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Me } from "@/app/actions/actions";
import { ClientDetails } from "@/app/models/client";
import { Error } from "@/app/models/error";

export default function Account() {
  const [client, setClient] = useState<ClientDetails | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchClient = async () => {
    const response = await Me();
    if (response.clientDetails) {
      setClient(response.clientDetails);
    }
    if (response.error) {
      setError(response.error);
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {error?.description && (
        <div className="mt-8 bg-red-200 p-8 rounded text-center shadow-md">
          <p>{error?.description}</p>
        </div>
      )}
      {client && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                // src={client.avatar}
                src={
                  "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                }
                alt="Client Avatar"
                className="w-16 h-16 rounded-full mr-4"
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
              <p className="text-xl font-bold">role: {client.role}</p>
            </div>
          </div>
          <div className="mt-8 mb-40">
            <Slider {...sliderSettings}>
              {client.photos.map((photo) => (
                <div key={photo.id}>
                  <img
                    // src={photo.url}
                    src={
                      "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                    }
                    alt={photo.name}
                    className="w-full object-cover rounded"
                    style={{ height: "600px" }}
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
