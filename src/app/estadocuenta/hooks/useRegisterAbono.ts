/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import {
  IAlertInput,
  defaultAlertInput,
} from "../../../interfaces/alert.interface";
import { useApiRequest } from "@/app/hooks/useApiRequest";
interface RegisterDataAbono {
  montoingreso:number
}

const defaultDataLogin: RegisterDataAbono = {
	montoingreso:0
};

/* registerLocale("es", es); */

const Swal = require('sweetalert2')

const useRegisterAbono = () => {
  const {
    execute: registerAbonoApi,
    status: statusRegisterAbono,
    value: dataRegisterAbono,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "POST",
  });

  
  useEffect(() => {
    if (statusRegisterAbono === "success") {
      const Lote = {
        statusRegisterAbono };
      console.log(Lote);
      Swal.fire({
        title: 'Se ha añadido Correctamente!',
        text: 'Refresca la pagina para ver los cambios',
        icon: 'success',
        confirmButtonText: 'Hecho'
      })
      
    } else if (statusRegisterAbono === "error") {
      Swal.fire({
        title: 'No tienes permisos!...',
        text: 'No tienes los permisos para editar este apartado',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
    }
  }, [statusRegisterAbono]);

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [data, setData] = useState<RegisterDataAbono>(defaultDataLogin);

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
    registerAbonoApi,
    setData,
  };
};

export default useRegisterAbono;
