import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useDeleteCliente = () => {
  
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
		 console.log(dataDeleteCliente);
    } else if (statusDeleteCliente === "error") {
      console.log(dataDeleteCliente);
    }
  }, [statusDeleteCliente]);

  const startDeleteCliente = async () => {
    if (statusDeleteCliente === "pending") {
      try {
       await DeleteClienteApi();
	   
      } catch (error) {
        console.log(error);
      }
    }
  };



  return {

    startDeleteCliente,
	DeleteClienteApi
  };
};

export default useDeleteCliente