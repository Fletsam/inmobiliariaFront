/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import {
  IAlertInput,
  defaultAlertInput,
} from "../../../interfaces/alert.interface";
import { useApiRequest } from "@/app/hooks/useApiRequest";
interface RegisterDataFuncion {
  tarea: string;
  estado:boolean
  fechafin:Date
}

const defaultDataLogin: RegisterDataFuncion = {
  tarea: "",
  estado:false,
  fechafin: new Date() 

};

/* registerLocale("es", es); */

const Swal = require('sweetalert2')

const useRegisterFuncion = () => {
  const {
    execute: registerFuncionApi,
    status: statusRegisterFuncion,
    value: dataRegisterFuncion,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "funciones",
    method: "POST",
  });

  
  useEffect(() => {
    if (statusRegisterFuncion === "success") {
      const Fracc = {
        statusRegisterFuncion };
      console.log(Fracc);
      Swal.fire({
        title: 'Se ha añadido Correctamente!',
        text: 'Refresca la pagina para ver los cambios',
        icon: 'success',
        confirmButtonText: 'Hecho'
      })
      console.log(statusRegisterFuncion);
    } else if (statusRegisterFuncion === "error") {
      
      console.log(statusRegisterFuncion);
      Swal.fire({
        title: 'No tienes permisos!...',
        text: 'No tienes los permisos para editar este apartado',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
    }
  }, [statusRegisterFuncion]);

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [data, setData] = useState<RegisterDataFuncion>(defaultDataLogin);

  const handleSetData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((dataValue) => ({ ...dataValue, [name]: value }));
  };

  const handleSetDate = (date: Date | null) => {
    if (date instanceof Date) {
      setData({ ...data, fechafin: date });
    }
  };

  return {
    handleSetDate,
    data,
    handleSetData,
    /* disabledButton */
    setShowAlert,
    showAlert,
    registerFuncionApi,
    setData,
  };
};

export default useRegisterFuncion;
