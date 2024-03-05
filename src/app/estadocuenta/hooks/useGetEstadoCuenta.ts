

import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetEstadoCuenta = () => {
  
  const {
    execute: useEstadoCuentaApi,
    status: statusEstadoCuenta,
    value: dataEstadoCuenta,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "get",
  });
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [estadoCuenta, setEstadoCuenta] = useState({});
  useEffect(() => {
    if (statusEstadoCuenta === "success") {
    
		const estadocuenta = (dataEstadoCuenta.data);
		const ingresos = (dataEstadoCuenta.data.IngresosContratos)
		const egresos = (dataEstadoCuenta.data.EgresosContratos)
		
		
		setEgresos(egresos)
		setIngresos(ingresos)
      setEstadoCuenta( estadocuenta);
    } else if (statusEstadoCuenta === "error") {
      console.log(dataEstadoCuenta);
    }
  }, [statusEstadoCuenta]);

  const startLoadingEstadoCuenta = async (param:string) => {
    if (statusEstadoCuenta === "pending") {
      try {
        useEstadoCuentaApi({},param);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return {
	startLoadingEstadoCuenta,
    useEstadoCuentaApi,
    dataEstadoCuenta,
    statusEstadoCuenta,
	estadoCuenta,
	egresos,
	ingresos
  };
};

export default useGetEstadoCuenta;
