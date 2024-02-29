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
  nombre?: string;
  genero?: string;
  calle?: string;
  numeroext?: string;
  numeroint?: string;
  colonia?: string;
  cp?: string;
  ciudad?: string;
  estadocivil?: string;
  correo?: string;
  telefono?: string;
  curp?: string;
  ocupacion?: string;
  lugardetrabajo?: string;
  telefonodetrabajo?: string;
  referencia?: string;
  telefonodereferencia?: string;
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

const useEditCliente = (id:number) => {
  const {
    execute: editClienteApi,
    status: statusEditCliente,
    value: dataEditCliente,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: `clientes/${id}`,
    method: "PATCH",
  });

  useEffect(() => {
    if (statusEditCliente === "success" ) {
      const dateFormat = moment(dataEditCliente.date).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      const Cliente = {
        ...dataEditCliente,
        dateFormat,
      };
      console.log(Cliente);

      console.log(statusEditCliente);
    } else if (statusEditCliente === "error") {
      console.log(dataEditCliente);
      console.log(statusEditCliente);
    }
  }, [statusEditCliente]);

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
    editClienteApi,
    setData,
  };
};

export default useEditCliente;
