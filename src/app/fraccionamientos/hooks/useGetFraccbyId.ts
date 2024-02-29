
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetFraccbyId = (id:number) => {
  
  const {
    execute: FraccApi,
    status: statusFracc,
    value: dataFracc,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: `fraccionamientos/${id}`,
    method: "get",
  });
  const [fracc, setFracc] = useState({});
  const [manzanas, setManzanas] = useState([])
  
  useEffect(() => {
    if (statusFracc === "success") {
      const fracc = dataFracc;
		/* console.log(cliente); */
		

      setFracc(fracc);
	  setManzanas(fracc.Manzanas)
    } else if (statusFracc === "error") {
      console.log(dataFracc);
    }
  }, [statusFracc]);

  const startLoadingFracc = async () => {
    if (statusFracc === "pending") {
      try {
        FraccApi();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showClient = (e) => {  
      console.log(e)
  }

  

  return {
	manzanas,
    FraccApi,
    dataFracc,
    statusFracc,
    fracc,
    startLoadingFracc,
    showClient,
  };
};

export default useGetFraccbyId