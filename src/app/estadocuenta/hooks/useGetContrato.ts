

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
  const [contrato, setContrato] = useState({});
  const [cliente , setCliente] = useState({})
  const [lote , setLote] = useState({})
  useEffect(() => {
    if (statusContrato === "success") {
   
		setCliente(dataContrato.Cliente)
      setContrato( dataContrato.Found);
	  setLote(dataContrato.Lote)
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
	cliente,
	lote
  };
};

export default useGetContratobyId;