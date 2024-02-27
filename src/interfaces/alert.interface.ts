export interface IAlertInput {
  show: boolean;
  message: string;
  severity: "error" | "info" | "warning" | "success";
  type?: string | null;
}
export const defaultAlertInput: IAlertInput = {
  show: false,
  message: "",
  severity: "error",
  type: null,
};
