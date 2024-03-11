import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetUsuariobyId = () => {
  
  const {
    execute: usuarioApi,
    status: statusUsuario,
    value: dataUsuario,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "get",
  });
  const [usuario, setUsuario] = useState({});
  const [area, setArea] = useState({});
  const [funciones, setFunciones] = useState([]);
  useEffect(() => {
    if (statusUsuario === "success") {
      const usuario = dataUsuario ;
      const area = dataUsuario.area
      const funciones = dataUsuario.Funciones
      
      setFunciones(funciones)
      setArea(area)
	  setUsuario(usuario)
    } else if (statusUsuario === "error") {
      console.log(dataUsuario);
    }
  }, [statusUsuario]);

  const startLoadingUsuario = async (param:string) => {
    if (statusUsuario === "pending") {
      try {
      await  usuarioApi({},param);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return {
    usuarioApi,
    dataUsuario,
    startLoadingUsuario,
    usuario,
    area,
    funciones
  };
};

export default useGetUsuariobyId