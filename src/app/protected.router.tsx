"use client"
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "@/store/modules/user.module";

interface AuthInitializerProps {
  children: ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("user");
      const tokenFromLocalStorage = localStorage.getItem("access_token");

      if (userFromLocalStorage) {
        dispatch(setUser(JSON.parse(userFromLocalStorage)));
      }

      if (tokenFromLocalStorage) {
        dispatch(setUser(tokenFromLocalStorage));
      }
    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;