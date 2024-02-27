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
  nombre: string;
  genero: string;
  calle: string;
  numeroext: string;
  numeroint: string;
  colonia: string;
  cp: string;
  ciudad: string;
  estadocivil: string;
  correo: string;
  telefono: string;
  curp: string;
  ocupacion: string;
  lugardetrabajo: string;
  telefonodetrabajo: string;
  referencia: string;
  telefonodereferencia: string;
}

const defaultDataLogin: RegisterDataCliente = {
  nombre: "",
  genero: "",
  calle: "",
  numeroext: "",
  numeroint: "",
  colonia: "",
  cp: "",
  ciudad: "",
  estadocivil: "",
  correo: "",
  telefono: "",
  curp: "",
  ocupacion: "",
  lugardetrabajo: "",
  telefonodetrabajo: "",
  referencia: "",
  telefonodereferencia: ""
};

/* registerLocale("es", es); */

const useRegisterCliente = () => {
  const {
    execute: registerClienteApi,
    status: statusRegisterCliente,
    value: dataRegisterCliente,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "clientes",
    method: "POST",
  });

  useEffect(() => {
    if (statusRegisterCliente === "success") {
      const dateFormat = moment(dataRegisterCliente.date).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      const Cliente = {
        ...dataRegisterCliente,
        dateFormat,
      };
      console.log(Cliente);

      console.log(statusRegisterCliente);
    } else if (statusRegisterCliente === "error") {
      console.log(dataRegisterCliente);
      console.log(statusRegisterCliente);
    }
  }, [statusRegisterCliente]);

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
    registerClienteApi,
    setData,
  };
};

export default useRegisterCliente;
