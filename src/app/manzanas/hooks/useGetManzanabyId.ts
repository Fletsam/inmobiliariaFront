
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetManzanabyId = () => {
  
  const {
    execute: ManzanaApi,
    status: statusManzana,
    value: dataManzana,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: ``,
    method: "get",
  });
  const [manzana, setManzana] = useState({});
  const [lotes, setLotes] = useState([])
  const [fracc, setFracc] = useState({})
  
  useEffect(() => {
    if (statusManzana === "success") {
      const manzana = dataManzana;
		/* console.log(cliente); */
		

      setManzana(manzana);
	    setLotes(manzana.Lotes)
	    setFracc(manzana.fraccionamiento)
    } else if (statusManzana === "error") {
      console.log(dataManzana);
    }
  }, [statusManzana]);

  const startLoadingManzana = async ( param:string) => {
    if (statusManzana === "pending") {
      try {
        ManzanaApi({},param);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showClient = (e) => {  
      console.log(e)
  }

  

  return {
	lotes,
    ManzanaApi,
    dataManzana,
    statusManzana,
    manzana,
    fracc,
    startLoadingManzana,
    showClient,
  };
};

export default useGetManzanabyId