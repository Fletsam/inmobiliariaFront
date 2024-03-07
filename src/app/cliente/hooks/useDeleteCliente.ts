import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useDeleteCliente = () => {
  const Swal = require('sweetalert2')
  const router = useRouter()
  const {
    execute: DeleteClienteApi,
    status: statusDeleteCliente,
    value: dataDeleteCliente,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "DELETE",
  });
  
   useEffect(() => {
    if (statusDeleteCliente === "success") {
		  Swal.fire({
            title: "Borrado!",
            text: "El Cliente ha sido Eliminado!.",
            icon: "success"
          });
           router.refresh()
    } else if (statusDeleteCliente === "error") {
       Swal.fire({
            title: "Rechazo!",
            text: "Este Cliente no se puede eliminar!.",
            icon: "error"
          });
          router.refresh()
    }
  }, [statusDeleteCliente]);

  const startDeleteCliente = async (param:string) => {
    if (statusDeleteCliente === "pending") {
      try {
       await DeleteClienteApi({},param);
       
      } catch (error) {
        
      }
    }
  };



  return {

    startDeleteCliente,
	DeleteClienteApi
  };
};

export default useDeleteCliente