

import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useFraccs = () => {
  
  const {
    execute: useFraccsApi,
    status: statusFracc,
    value: dataFracc,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: `fraccionamientos`,
    method: "get",
  });
  const [fraccs, setFraccs] = useState([]);
  useEffect(() => {
    if (statusFracc === "success") {
      const fraccs = dataFracc.data;

      setFraccs(fraccs);
    } else if (statusFracc === "error") {
      console.log(dataFracc);
    }
  }, [statusFracc]);

  const startLoadingFraccs = async () => {
    if (statusFracc === "pending") {
      try {
        useFraccsApi();
      } catch (error) {
        console.log(error);
      }
    }
  };


  return {
	startLoadingFraccs,
    useFraccsApi,
    dataFracc,
    statusFracc,
	fraccs
  };
};

export default useFraccs;
