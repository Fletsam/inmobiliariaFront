

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
  const [egresosfracc, setEgresosFracc] = useState([]);
  const [ingresosfracc, setIngresosFracc] = useState([]);
  const [estadoCuenta, setEstadoCuenta] = useState({});
  useEffect(() => {
    if (statusEstadoCuenta === "success") {
    
		const estadocuenta = (dataEstadoCuenta.data);
		const ingresoscontratos = (dataEstadoCuenta.data.IngresosContratos)
		const egresoscontratos = (dataEstadoCuenta.data.EgresosContratos)
		const ingresosfracc = (dataEstadoCuenta.data.IngresosFraccionamientos)
		const egresosfracc = (dataEstadoCuenta.data.EgresosFraccionamiento)
		
    setEgresosFracc(egresosfracc)
    setIngresosFracc(ingresosfracc)
		setEgresos(egresoscontratos)
		setIngresos(ingresoscontratos)
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
	ingresos,
  egresosfracc,
  ingresosfracc
  };
};

export default useGetEstadoCuenta;
