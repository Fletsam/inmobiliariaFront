
export const capitalizar = (String:string) => {
 String.trim().replace(/^\w/, (c) => c.toUpperCase())
}
