

import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useCliente = () => {
  
  const {
    execute: ClienteApi,
    status: statusCliente,
    value: dataCliente,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: `clientes`,
    method: "get",
  });
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    if (statusCliente === "success") {
      const cliente = dataCliente.data;

      setClientes(cliente);
    } else if (statusCliente === "error") {
      console.log(dataCliente);
    }
  }, [statusCliente]);

  const startLoadingClientes = async () => {
    if (statusCliente === "pending") {
      try {
        ClienteApi();
      } catch (error) {
        console.log(error);
      }
    }
  };



  const showClient = (e) => {  
      console.log(e)
  }

  const edit = () => {
    ClienteApi();
    /*  navigate(`/Clientes/${users.id}`); */
  };

  return {
    edit,
    ClienteApi,
    dataCliente,
    statusCliente,
    clientes,
    startLoadingClientes,
    showClient,
  };
};

export default useCliente;