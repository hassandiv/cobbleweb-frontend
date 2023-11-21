import { useState, useEffect } from "react";
import { Me } from "@/app/actions/actions";
import { ClientDetails } from "@/app/models/client";
import { Error } from "@/app/models/error";

export const useProfileData = () => {
  const [client, setClient] = useState<ClientDetails | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchClient = async () => {
    setIsLoading(true);
    try {
      const response = await Me();
      if (response.clientDetails) {
        setClient(response.clientDetails);
        setIsLoading(false);
      }
      if (response.error) {
        setError(response.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return {
    client,
    error,
    isLoading,
  };
};
