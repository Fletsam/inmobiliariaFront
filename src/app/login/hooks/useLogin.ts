/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-catch */
import { useMemo, useState, useEffect } from "react";

import { useApiRequest } from "../../hooks/useApiRequest";
import { useDispatch } from "react-redux";

import { jwtDecode } from "jwt-decode";
import { IAlertInput, defaultAlertInput } from "@/interfaces/alert.interface";
import { setUser } from "@/store/modules/user.module";
import { isEmail, isEmpty } from "@/app/libs/validators";
import { redirect } from "next/navigation";


interface LoginData {
  usuario: string;
  pass: string;
}

const defaultDataLogin: LoginData = {
  usuario: "",
  pass: "",
};

const useLogin = () => {
  const dispatch = useDispatch();
  const {
    execute: loginApi,
    status: statusLogin,
    value: dataLogin,
  } = useApiRequest<IParamsLogin, IResponseLogin>({
    path: "auth/login",
    method: "POST",
  });

  const [showAlert, setShowAlert] = useState<IAlertInput>(defaultAlertInput);
  const [data, setData] = useState<LoginData>(defaultDataLogin);

  useEffect(() => {
    if (statusLogin === "success") {
      console.log(data);
      
      const decoded = jwtDecode(dataLogin.data.access_token);
      console.log(decoded);
      
      const userLogged = {
        ...decoded,
        token: dataLogin.data.access_token,
        isLogged: true,
      };
      console.log(userLogged);
      dispatch(setUser(userLogged));
      redirect("/usuario")
    } else if (statusLogin === "error") {
      console.log(dataLogin);
    }
  }, [statusLogin]);

  const disabledButton = useMemo((): boolean => {
    const { email, password } = data;
    if (!isEmail(email) || isEmpty(password)) {
      return true;
    }
    return false;
  }, [data]);

  const handleSetData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((dataValue) => ({ ...dataValue, [name]: value }));
  };

  const handleLogin = async () => {
    await loginApi(data);
  };

  return {
    data,
    handleSetData,
    disabledButton,
    setShowAlert,
    showAlert,
    handleLogin,
  };
};

export default useLogin;
