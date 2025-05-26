/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../../../../components/ui/input";
import { VITE_API_URL } from "../../../../config/config";

export const EditDataFact = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(`${VITE_API_URL}/factura/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);
  console.log(data);
  return (
    <div>
      <form key={id}>
        {data && (
          <Input type="text" defaultValue={data.status} placeholder="Hola" />
        )}
      </form>
    </div>
  );
};
