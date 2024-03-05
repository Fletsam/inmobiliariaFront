/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import {
  IAlertInput,
  defaultAlertInput,
} from "../../../interfaces/alert.interface";
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { registerLocale } from "react-datepicker";
import moment from "moment";
import es from "date-fns/locale/es";
interface RegisterDataCliente {
  numero: string;
  manzanaId: number
  costo:number
  m2:number
}

const defaultDataLogin: RegisterDataCliente = {
  numero: "",
  manzanaId: 0,
  costo:0,
  m2:0
};

/* registerLocale("es", es); */

const Swal = require('sweetalert2')

const useRegisterLote = () => {
  const {
    execute: registerLoteApi,
    status: statusRegisterLote,
    value: dataRegisterLote,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "lotes",
    method: "POST",
  });

  
  useEffect(() => {
    if (statusRegisterLote === "success") {
      const Lote = {
        statusRegisterLote };
      console.log(Lote);
      Swal.fire({
        title: 'Se ha añadido Correctamente!',
        text: 'Refresca la pagina para ver los cambios',
        icon: 'success',
        confirmButtonText: 'Hecho'
      })
      console.log(statusRegisterLote);
    } else if (statusRegisterLote === "error") {
      console.log(statusRegisterLote);
      console.log(statusRegisterLote);
      Swal.fire({
        title: 'No tienes permisos!...',
        text: 'No tienes los permisos para editar este apartado',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
    }
  }, [statusRegisterLote]);

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
    registerLoteApi,
    setData,
  };
};

export default useRegisterLote;
