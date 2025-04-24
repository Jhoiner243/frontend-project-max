import React, { useState } from "react"
import { useClient } from "../context/client-context"
import { clientCreate } from "../types/client.types"

const intialState = {
    address: '',
    email: '',
    name: '',
    phone: ''
  }


export const useClientCreate = () => {
    const [client, setClient] = useState<clientCreate>(intialState)
    const [response, setResponse] = useState()
    const {createClient} = useClient()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setClient((prevClient) => ({
        ...prevClient,
        [name]: value,
      } as clientCreate));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(client === undefined) return
    console.log(client)
      createClient(
        client
      )
      setClient(intialState)
    }

    return {client, setClient, response, setResponse, handleChange, handleSubmit}
}