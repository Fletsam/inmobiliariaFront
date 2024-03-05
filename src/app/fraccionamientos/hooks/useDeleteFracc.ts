import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useDeleteFracc = () => {
  
  const {
    execute: DeleteFraccApi,
    status: statusDeleteFracc,
    value: dataDeleteFracc,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "DELETE",
  });
  
   useEffect(() => {
    if (statusDeleteFracc === "success") {
		 console.log(dataDeleteFracc);
    } else if (statusDeleteFracc === "error") {
      console.log(dataDeleteFracc);
    }
  }, [statusDeleteFracc]);

  const startDeleteFracc = async () => {
    if (statusDeleteFracc === "pending") {
      try {
       await DeleteFraccApi();
	   
      } catch (error) {
        console.log(error);
      }
    }
  };



  return {

    startDeleteFracc,
	DeleteFraccApi
  };
};

export default useDeleteFracc