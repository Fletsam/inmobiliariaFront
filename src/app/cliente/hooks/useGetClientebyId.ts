import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetClientebyId = () => {
  
  const {
    execute: ClienteApi,
    status: statusCliente,
    value: dataCliente,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "get",
  });
  const [cliente, setCliente] = useState({});
  useEffect(() => {
    if (statusCliente === "success") {
      const cliente = dataCliente;
		/* console.log(cliente); */
		
		
      setCliente(cliente);
    } else if (statusCliente === "error") {
      console.log(dataCliente);
    }
  }, [statusCliente]);

  const startLoadingClientes = async (param:string) => {
    if (statusCliente === "pending") {
      try {
        ClienteApi({},param);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return {
    ClienteApi,
    dataCliente,
    statusCliente,
    cliente,
    startLoadingClientes,
  };
};

export default useGetClientebyId