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

}

const defaultDataLogin: RegisterDataCliente = {
  numero: "",
};

/* registerLocale("es", es); */

const useRegisterManzana = () => {
  const {
    execute: registerManzanaApi,
    status: statusRegisterManzana,
    value: dataRegisterManzana,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "manzanas",
    method: "POST",
  });

  useEffect(() => {
    if (statusRegisterManzana === "success") {
      const Cliente = {
        dataRegisterManzana };
      console.log(Cliente);

      console.log(statusRegisterManzana);
    } else if (statusRegisterManzana === "error") {
      console.log(statusRegisterManzana);
      console.log(statusRegisterManzana);
    }
  }, [statusRegisterManzana]);

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
    registerManzanaApi,
    setData,
  };
};

export default useRegisterManzana;
