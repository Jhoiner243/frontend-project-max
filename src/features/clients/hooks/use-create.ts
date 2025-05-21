import React, { useState } from "react";
import { clientCreate } from "../client.types";
import { useClient } from "../context/client-context";

const intialState = {
  address: "",
  email: "",
  name: "",
  phone: "",
};

export const useClientCreate = () => {
  const [client, setClient] = useState<clientCreate>(intialState);
  const [response, setResponse] = useState();
  const { createClient } = useClient();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClient(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prevClient: any) =>
        ({
          ...prevClient,
          [name]: value,
        } as clientCreate)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (client === undefined) return;
    createClient(client);
    setClient(intialState);
  };

  return {
    client,
    setClient,
    response,
    setResponse,
    handleChange,
    handleSubmit,
  };
};
