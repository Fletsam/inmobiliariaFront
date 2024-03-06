

import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useLotes = () => {
  
  const {
    execute: useLotesApi,
    status: statusLotes,
    value: dataLotes,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: `lotes`,
    method: "get",
  });
  const [lotesVendidos, setLotesVendidos] = useState([]);
  useEffect(() => {
    if (statusLotes === "success") {
      const lotes = dataLotes.data;

      setLotesVendidos(lotes);
    } else if (statusLotes === "error") {
      console.log(dataLotes);
    }
  }, [statusLotes]);

  const startLoadingLotes = async () => {
    if (statusLotes === "pending") {
      try {
        useLotesApi();
      } catch (error) {
        console.log(error);
      }
    }
  };


  return {
	startLoadingLotes,
    useLotesApi,
    dataLotes,
    statusLotes,
	lotesVendidos
  };
};

export default useLotes;
