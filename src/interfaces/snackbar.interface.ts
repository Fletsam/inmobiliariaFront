export interface IAlert {
  show: boolean;
  message?: string;
  severity: "info" | "warning" | "error" | "success";
}

export const defaultAlertValue: IAlert = {
  show: false,
  message: "",
  severity: "warning",
};
