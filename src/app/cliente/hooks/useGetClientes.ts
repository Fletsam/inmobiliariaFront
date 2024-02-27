

import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useDisclosure } from "@nextui-org/react";
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
const [cliente, setCliente] = useState({});
  useEffect(() => {
    if (statusCliente === "success") {
      const cliente = dataCliente.data;
      console.log(cliente);

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
      setCliente(e)
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
    cliente
  };
};

export default useCliente;
