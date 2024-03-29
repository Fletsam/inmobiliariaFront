
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetFraccbyId = () => {
  
  const {
    execute: FraccApi,
    status: statusFracc,
    value: dataFracc,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "get",
  });
  const [fracc, setFracc] = useState({});
  const [manzanas, setManzanas] = useState([])
  const [lotes, setLotes] = useState([])
  useEffect(() => {
    if (statusFracc === "success") {
      const fracc = dataFracc;
		/* console.log(cliente); */
		
      setLotes(fracc.Lotes)
      setFracc(fracc);
	  setManzanas(fracc.Manzanas)
    } else if (statusFracc === "error") {
      console.log(dataFracc);
    }
  }, [statusFracc]);

  const startLoadingFracc = async (param:string) => {
    if (statusFracc === "pending") {
      try {
        FraccApi({},param);
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
    lotes,
  };
};

export default useGetFraccbyId