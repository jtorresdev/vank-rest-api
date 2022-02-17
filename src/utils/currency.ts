export const convertCurrency = (rate:number, amount?:number) => {
  if(!amount) return amount

  return amount / rate
}