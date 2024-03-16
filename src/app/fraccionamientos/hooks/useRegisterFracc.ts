/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import {
  IAlertInput,
  defaultAlertInput,
} from "../../../interfaces/alert.interface";
import { useApiRequest } from "@/app/hooks/useApiRequest";
interface RegisterDataFracc {
  nombre: string;
  clave:string
  propietario:string
  telefono:string
  direccion:string
  totaldemanzanas:number
  m2:number
}

const defaultDataLogin: RegisterDataFracc = {
  nombre: "",
  clave:"",
  propietario:"",
  telefono:"",
  direccion:"",
  totaldemanzanas:0,
  m2: 0

};

/* registerLocale("es", es); */

const Swal = require('sweetalert2')

const useRegisterFracc = () => {
  const {
    execute: registerFraccApi,
    status: statusRegisterFracc,
    value: dataRegisterFracc,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "fraccionamientos",
    method: "POST",
  });

  
  useEffect(() => {
    if (statusRegisterFracc === "success") {
      const Fracc = {
        statusRegisterFracc };
      console.log(Fracc);
      Swal.fire({
        title: 'Se ha añadido Correctamente!',
        text: 'Refresca la pagina para ver los cambios',
        icon: 'success',
        confirmButtonText: 'Hecho'
      })
      console.log(statusRegisterFracc);
    } else if (statusRegisterFracc === "error") {
      
      console.log(statusRegisterFracc);
      Swal.fire({
        title: 'No tienes permisos!...',
        text: 'No tienes los permisos para editar este apartado',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
    }
  }, [statusRegisterFracc]);

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [data, setData] = useState<RegisterDataFracc>(defaultDataLogin);

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
    registerFraccApi,
    setData,
  };
};

export default useRegisterFracc;
