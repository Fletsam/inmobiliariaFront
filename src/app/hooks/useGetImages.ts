import { useApiRequest } from "@/app/hooks/useApiRequest";
import { useEffect, useState } from "react";
import { useApiRequestImage } from "./useApiRequestImage";

const useGetImages = () => {
  
  const {
    execute: ImagesApi,
    status: statusImages,
    value: dataImages,
  } = useApiRequestImage<IParamsLogin, IResponseLogin>({
    path: "",
    method: "get",
  });

const [images , setImages] = useState()

  useEffect(() => {
    if (statusImages === "success") {
		setImages(dataImages)
    } else if (statusImages === "error") {
      console.log(dataImages);
    }
  }, [statusImages]);

  const startLoadingImages = async () => {
    if (statusImages === "pending") {
      try {
        ImagesApi();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showClient = (e) => {  
      console.log(e)
  }

  

  return {

    ImagesApi,
    dataImages,
    statusImages,
	startLoadingImages,
    showClient,
  };
};

export default useGetImages