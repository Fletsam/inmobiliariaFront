/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { registerLocale } from "react-datepicker";
import moment from "moment";
import es from "date-fns/locale/es";
import { IAlertInput, defaultAlertInput } from "@/interfaces/alert.interface";
interface RegisterDataInversion {
  testigo1: string;
  testigo2: string;
  monto: number;
  comision: number;
  montodeintereses:number
  pagosafinanciar: number;
  utilidad:number
  interesanual:number
  montototal:number
  pagomensual:number
  nombre:string
  interesmensual: number;
  estatus:number
  pagado:number
  fhcreacion:Date
  inicio:Date
  fecha:Date
  usuarioId:number
  clienteId:number
}

const defaultDataLogin: RegisterDataInversion = {
  testigo1: "",
	testigo2: "",
	monto:0,
	comision:0,
  montodeintereses:0,
  utilidad:0,
  interesanual:0,
  montototal:0,
  pagomensual:0,
  nombre:"",
  estatus:0,
  pagado:0,
  fhcreacion: new Date(),
	pagosafinanciar:0,
	interesmensual:0,
	inicio: new Date(),
  fecha: new Date(),
  usuarioId:0,
  clienteId:0
};

/* registerLocale("es", es); */
const Swal = require('sweetalert2')
const useRegisterInversion = () => {
  const {
    execute: registerInversionApi,
    status: statusRegisterInversion,
    value: dataRegisterInversion,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "POST",
  });

  useEffect(() => {
    if (statusRegisterInversion === "success") {
    
      Swal.fire({
        title: 'Se ha añadido Correctamente!',
        text: 'Refresca la pagina para ver los cambios',
        icon: 'success',
        confirmButtonText: 'Hecho'
      })
    } else if (statusRegisterInversion === "error") {
      Swal.fire({
        title: 'No tienes permisos!...',
        text: 'No tienes los permisos para editar este apartado',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
      console.log(statusRegisterInversion);
    }
  }, [statusRegisterInversion]);

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [data, setData] = useState<RegisterDataInversion>(defaultDataLogin);

  const handleSetData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((dataValue) => ({ ...dataValue, [name]: value }));
  };

  const handleSetDate = (date: Date | null) => {
    if (date instanceof Date) {
      setData({ ...data, fecha: date, inicio: date });
    }
  };

  return {
    handleSetDate,
    data,
    handleSetData,
    /* disabledButton */
    setShowAlert,
    showAlert,
    registerInversionApi,
    setData,
  };
};

export default useRegisterInversion;
