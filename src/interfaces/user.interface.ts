export interface IUser {
  id: string;
  nombre: string;
  token: string;
  email: string;
  isLogged: boolean;
}

export const defaultValueUser: IUser = {
  id: "",
  nombre: "",
  token: "",
  isLogged: false,
  email: "",
};
