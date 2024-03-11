/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import {
  IAlertInput,
  defaultAlertInput,
} from "../../../interfaces/alert.interface";
import { useApiRequest } from "@/app/hooks/useApiRequest";
interface RegisterDataFuncion {
  tarea?: string;
  estado?:boolean
  fechafin?:Date
}

const defaultDataLogin: RegisterDataFuncion = {
  tarea: "",
  estado:true,
  fechafin: new Date() 

};

/* registerLocale("es", es); */

const Swal = require('sweetalert2')

const usePatchFuncion = () => {
  const {
    execute: patchFuncionApi,
    status: statusPatchFuncion,
    value: dataPatchFuncion,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "PATCH",
  });

  
  useEffect(() => {
    if (statusPatchFuncion === "success") {
      const Fracc = {
        statusPatchFuncion };

      console.log(statusPatchFuncion);
    } else if (statusPatchFuncion === "error") {
      

    }
  }, [statusPatchFuncion]);

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [dataEdit, setDataEdit] = useState<RegisterDataFuncion>(defaultDataLogin);

  const handleSetData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDataEdit((dataValue) => ({ ...dataValue, [name]: value }));
  };

  const handleSetDate = (date: Date | null) => {
    if (date instanceof Date) {
      setDataEdit({ ...dataEdit, fechafin: date });
    }
  };

  return {
    handleSetDate,
    dataEdit,
    handleSetData,
    /* disabledButton */
    setShowAlert,
    showAlert,
    patchFuncionApi,
    setDataEdit,
  };
};

export default usePatchFuncion;
