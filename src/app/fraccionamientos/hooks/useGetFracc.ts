

import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";

const useFraccs = () => {
  
  const {
    execute: useFraccsApi,
    status: statusFracc,
    value: dataFracc,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "",
    method: "get",
  });
  const [fraccs, setFraccs] = useState([]);
  const [manzanas, setManzanas] = useState([]);
  useEffect(() => {
    if (statusFracc === "success") {
      const fraccs = dataFracc.Manzanas
      const manzanas = dataFracc.Manzanas
      setManzanas(manzanas)
      setFraccs([{...fraccs}]);
    } else if (statusFracc === "error") {
      console.log(dataFracc);
    }
  }, [statusFracc]);

  const startLoadingFraccs = async (param:string) => {
    if (statusFracc === "pending") {
      try {
        useFraccsApi([],param);
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
	fraccs,
  manzanas
  };
};

export default useFraccs;
