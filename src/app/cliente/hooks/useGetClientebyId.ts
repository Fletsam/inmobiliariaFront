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
  const [clientes, setClientes] = useState([]);
  const [clientesContratos, setClientesContratos] = useState([])
  const [clienteContratos, setClienteContratos] = useState([])
  useEffect(() => {
    if (statusCliente === "success") {
      const cliente = dataCliente;
      
      const contratosbycliente = dataCliente.Contratos
      const clientes = dataCliente.clientes
      const contratos = dataCliente.contratos
      
      setClientes(clientes);
      setClienteContratos(contratosbycliente)
      setClientesContratos(contratos);
      setCliente(cliente);
    } else if (statusCliente === "error") {
      console.log(dataCliente);
    }
  }, [statusCliente]);

  const startLoadingClientes = async (param:string) => {
    if (statusCliente === "pending") {
      try {
      await  ClienteApi({},param);
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
    clientesContratos,
    clientes,
    clienteContratos,
    startLoadingClientes,
  };
};

export default useGetClientebyId