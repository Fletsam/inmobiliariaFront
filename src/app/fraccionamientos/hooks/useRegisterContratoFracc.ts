/* eslint-disable no-useless-catch */
import { useState, useEffect } from "react";
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { IAlertInput, defaultAlertInput } from "@/interfaces/alert.interface";
interface RegisterContratoFraccCliente {
  testigo1: string;
  testigo2: string;
  metros2: number;
  preciom2: number;
  descuento: number;
  enganche: number;
  pagado:number
  pagosafinanciar: number;
  interesanual: number;
  fraccionamientoId: number
  comision:number
  montototal:number
  resto:number
  costo:number
  inicio:Date
  fecha:Date
  fhcreacion:Date
  usuarioId:number
  estatus:number
}

const defaultDataLogin: RegisterContratoFraccCliente = {
  	testigo1: "",
	testigo2: "",
	metros2:0,
	preciom2:0,
	descuento:0,
	enganche:0,
	pagado:0,
	pagosafinanciar:0,
	interesanual:0,
	fraccionamientoId:0,
	comision:0,
	montototal:0,
	resto:0,
	costo:0,
	inicio:new Date(),
	fecha: new Date(),
	fhcreacion: new Date(),
	usuarioId:0,
	estatus:0
};

/* registerLocale("es", es); */
const Swal = require('sweetalert2')
const useRegisterContratoFracc = () => {
  const {
    execute: registerContratoFraccApi,
    status: statusRegisterContratoFracc,
    value: dataRegisterContratoFracc,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "POST",
  });

  useEffect(() => {
    if (statusRegisterContratoFracc === "success") {
	 Swal.fire({
        title: 'Se ha añadido Correctamente!',
        text: 'Refresca la pagina para ver los cambios',
        icon: 'success',
        confirmButtonText: 'Hecho'
      })
    } else if (statusRegisterContratoFracc === "error") {
      Swal.fire({
        title: 'No tienes permisos!...',
        text: 'No tienes los permisos para editar este apartado',
        icon: 'error',
        confirmButtonText: 'Hecho'
      })
    }
  }, [statusRegisterContratoFracc]);

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [data, setData] = useState<RegisterContratoFraccCliente>(defaultDataLogin);

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
    registerContratoFraccApi,
    setData,
  };
};

export default useRegisterContratoFracc;
