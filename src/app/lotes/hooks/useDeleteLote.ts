import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useDeleteLote = () => {
  const Swal = require('sweetalert2')
  const router = useRouter()

  const {
    execute: DeleteLoteApi,
    status: statusDeleteLote,
    value: dataDeleteLote,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "DELETE",
  });
  
   useEffect(() => {
    if (statusDeleteLote === "success") {
		
      Swal.fire({
            title: "Borrado!",
            text: "El Lote ha sido Eliminado!.",
            icon: "success"
          });
    } else if (statusDeleteLote === "error") {
      Swal.fire({
            title: "Rechazo!",
            text: "El Lote no se puede eliminar!.",
            icon: "error"
          });
    }
    
  }, [statusDeleteLote]);

  const startDeleteLote = async (param:string) => {
    if (statusDeleteLote === "pending") {
      try {

       await DeleteLoteApi({},param);
	   
      } catch (error) {
        
      }
    }
  };



  return {

    startDeleteLote,
	DeleteLoteApi,
  statusDeleteLote
  };
};

export default useDeleteLote