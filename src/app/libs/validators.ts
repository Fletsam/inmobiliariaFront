export const isEmpty = (prop: any) => {
  return (
    prop === false ||
    prop === null ||
    prop === undefined ||
    (typeof prop === "string" && prop.trim().length === 0) ||
    (Object.prototype.hasOwnProperty.call(prop, "length") &&
      prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const isEmail = (email: string) => {
  if (email === "") return false;
  const x = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!x) {
    return false;
  } else {
    return true;
  }
};
export const isNumber = (value: string): boolean => {
  const reg = /^[0-9]+$/;
  if (value === "") return true;
  if (!value.match(reg)) {
    return false;
  }
  return true;
};

export const isCurp = (curp: string): boolean => {
  if (
    !curp.match(
      /^(^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$)$/
    )
  )
    return false;
  return true;
};
export const isPasswordValid = (password: string): boolean => {
  const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/;
  if (password.match(reg)) return true;
  else return false;
};
export const isRFC = (rfc: string): boolean => {
  if (
    !rfc.match(
      /^([A-ZÑ&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z_0-9]{3})?$/
    )
  )
    return false;
  return true;
};
