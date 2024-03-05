import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useDeleteLote = () => {
  
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
		 console.log(dataDeleteLote);
    } else if (statusDeleteLote === "error") {
      console.log(dataDeleteLote);
    }
  }, [statusDeleteLote]);

  const startDeleteLote = async () => {
    if (statusDeleteLote === "pending") {
      try {
       await DeleteLoteApi();
	   
      } catch (error) {
        console.log(error);
      }
    }
  };



  return {

    startDeleteLote,
	DeleteLoteApi
  };
};

export default useDeleteLote