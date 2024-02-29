
import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useGetManzanabyId = (id:number) => {
  
  const {
    execute: ManzanaApi,
    status: statusManzana,
    value: dataManzana,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: `manzanas/${id}`,
    method: "get",
  });
  const [manzana, setManzana] = useState({});
  const [lotes, setLotes] = useState([])
  
  useEffect(() => {
    if (statusManzana === "success") {
      const manzana = dataManzana;
		/* console.log(cliente); */
		

      setManzana(manzana);
	  setLotes(manzana.Lotes)
    } else if (statusManzana === "error") {
      console.log(dataManzana);
    }
  }, [statusManzana]);

  const startLoadingManzana = async () => {
    if (statusManzana === "pending") {
      try {
        ManzanaApi();
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
    startLoadingManzana,
    showClient,
  };
};

export default useGetManzanabyId