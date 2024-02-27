import { create} from "zustand"


export interface IUser {
  id: string;
  nombre: string;
  token: string;
  email: string;
  isLogged: boolean;
}

type State = {
  deep: {
    nested: {
      obj: { count: number }
    }
  }
}

type Action = {
  updateNombre: (nombre: State[]) => void
  updateLogged: (isLogged: boolean) => void
}

export const defaultValueUser: IUser = {
  id: "",
  nombre: "",
  token: "",
  isLogged: false,
  email: "",
};


export const usePersonStore = create((set) => ({
  nombre: '',
  isLogged: false,
  updateNombre: (nombre:string) => set(() => ({ nombre:nombre })),
  updateLogged: (isLogged:boolean) => set(() => ({ isLogged: isLogged })),
}))