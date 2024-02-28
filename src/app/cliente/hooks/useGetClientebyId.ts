import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetClientebyId = (id:number) => {
  
  const {
    execute: ClienteApi,
    status: statusCliente,
    value: dataCliente,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: `clientes/${id}`,
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
    cliente,
    startLoadingClientes,
    showClient,
  };
};

export default useGetClientebyId