

import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetContratobyId = () => {
  
  const {
    execute: useContratoApi,
    status: statusContrato,
    value: dataContrato,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "get",
  });
  const [contratoFracc, setContratoFracc] = useState({})
  const [contratos, setContratos] = useState([]);
  const [contrato, setContrato] = useState({});
  const [cliente , setCliente] = useState({})
  const [lote , setLote] = useState({})
  useEffect(() => {
    if (statusContrato === "success") {
   
    setContratoFracc(dataContrato)
		setCliente(dataContrato.Cliente)
    setContrato( dataContrato.Found);
	  setLote(dataContrato.Lote)
    setContratos(dataContrato.data)
    /* setContratos() */
    } else if (statusContrato === "error") {
      console.log(dataContrato);
    }
  }, [statusContrato]);

  const startLoadingContrato = async (param:string) => {
    if (statusContrato === "pending") {
      try {
        useContratoApi({},param);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return {
	startLoadingContrato,
    useContratoApi,
    dataContrato,
    contrato,
    contratos,
	cliente,
	lote,
  contratoFracc
  };
};

export default useGetContratobyId;
