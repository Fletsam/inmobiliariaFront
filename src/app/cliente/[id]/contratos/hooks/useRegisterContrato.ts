/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { registerLocale } from "react-datepicker";
import moment from "moment";
import es from "date-fns/locale/es";
import { IAlertInput, defaultAlertInput } from "@/interfaces/alert.interface";
interface RegisterDataCliente {
  testigo1: string;
  testigo2: string;
  m2: number;
  preciom2: number;
  costo: number;
  descuento: number;
  enganche: number;
  
  pagosafinanciar: number;
  interesanual: number;
  inicio: Date
  fecha : Date
  pagado:number
  usuarioId:number
  estatus:number
  clientesId:number
  contratoId:number
  comision:number
  loteId:number
}

const defaultDataLogin: RegisterDataCliente = {
  	testigo1: "",
	testigo2: "",
	m2:0,
	preciom2:0,
	costo:0,
	descuento:0,
	enganche:0,
	pagosafinanciar:0,
	interesanual:0,
  inicio: (new Date()), 
    fecha: (new Date()),
    pagado:0, 
    estatus: 0, 
    usuarioId: 0, 
    clientesId: 0 ,
    contratoId: 0 ,
    comision: 0,
    loteId: 0

};

/* registerLocale("es", es); */

const useRegisterContrato = () => {
  const {
    execute: registerContratoApi,
    status: statusRegisterContrato,
    value: dataRegisterContrato,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "POST",
  });

  useEffect(() => {
    if (statusRegisterContrato === "success") {
    
      const Cliente = {
        ...dataRegisterContrato,

      };
      console.log(Cliente);

      console.log(statusRegisterContrato);
    } else if (statusRegisterContrato === "error") {
      console.log(dataRegisterContrato);
      console.log(statusRegisterContrato);
    }
  }, [statusRegisterContrato]);

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [data, setData] = useState<RegisterDataCliente>(defaultDataLogin);

  const handleSetData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((dataValue) => ({ ...dataValue, [name]: value }));
  };

  const handleSetDate = (date: Date | null) => {
    if (date instanceof Date) {
      setData({ ...data, date: date });
    }
  };

  return {
    handleSetDate,
    data,
    handleSetData,
    /* disabledButton */
    setShowAlert,
    showAlert,
    registerContratoApi,
    setData,
  };
};

export default useRegisterContrato;
