import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useDeleteManzana = () => {
  
  const {
    execute: DeleteManzanaApi,
    status: statusDeleteManzana,
    value: dataDeleteManzana,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "DELETE",
  });
  
   useEffect(() => {
    if (statusDeleteManzana === "success") {
		 console.log(dataDeleteManzana);
    } else if (statusDeleteManzana === "error") {
      console.log(dataDeleteManzana);
    }
  }, [statusDeleteManzana]);

  const startDeleteManzana = async () => {
    if (statusDeleteManzana === "pending") {
      try {
       await DeleteManzanaApi();
	   
      } catch (error) {
        console.log(error);
      }
    }
  };



  return {

    startDeleteManzana,
	DeleteManzanaApi
  };
};

export default useDeleteManzana