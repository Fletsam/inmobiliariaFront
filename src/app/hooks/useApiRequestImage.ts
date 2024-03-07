/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { resetUser } from "@/store/modules/user.module";
import { stopLoading } from "@/store/modules/loading.module";
import { RootState } from "@/store";


interface IRequestPayload {
  path: string;
  method: string;
  headers?: {
    [key: string]: string;
  };
}

export const useApiRequestImage = <ParamsType, ResponseType>(
  { path, headers, method }: IRequestPayload,
  immediate = false
) => {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [statusRequest, setStatusRequest] = useState<number>();
  const [value, setValue] = useState<ResponseType | null>(null);
  const [totalRows, setTotalRows] = useState<number | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users);
  const abortController = useRef<AbortController | null>(null);

  const getTokenAuth = (): string => {
    const token = user.token;
    if (token) {
      return `Bearer ${token}`;
    }
    return "";
  };
const AWS = require('aws-sdk');

 AWS.config.update({
  accessKeyId: 'AKIAVRUVQYJLX45NKPWI',
  secretAccessKey: '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',
  region: 'us-east-2', // Reemplaza con la región de tu bucket, por ejemplo, 'us-east-1'
});

 
    // Reemplaza 'nombre_de_tu_folder' con el nombre de tu folder en Cloudinary
    const folder = 'Logos';

  const execute = useCallback(async (params?: ParamsType, pathPag?: string) => {
    setStatus("pending");
    setValue(null);
    abortController.current?.abort();
    abortController.current = new AbortController();

    try {
      const pathFlag = pathPag ? path + pathPag : path;
      const response = await axios({
        url: `https://377374312816216:Cqimzf5ZOnrWeu4ges0MH6MpECg@api.cloudinary.com/v1_1/dea3bexw3/resources/image`,
        method,
		
        headers: {
		  		'Access-Control-Allow-Origin': "*",
				"Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                'Content-Type': 'application/json',
				Accept: "text/plain",
          Authorization: getTokenAuth(),
          ...headers,
        },
        data: {
          ...params,
        },
        signal: abortController.current?.signal,
      });
      setTotalRows(Number(response.data.totalRegistros || 0));
      setStatusRequest(response.status);
      setValue(response.data);
      setStatus("success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.name === "CanceledError") return;

      if (
        error?.response?.statusText === "Unauthorized" ||
        error?.response?.status === 401
      ) {
        dispatch(resetUser());
      }
      if (error?.response?.data) {
        setValue(error?.response?.data);
      }
      setTotalRows(0);
      console.log(error);

      setStatus("error");
      dispatch(stopLoading());
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, totalRows, statusRequest };
};
