import { Currency } from "../db/models/customers";
import { Invoice } from "../db/models/invoices";
import { invoiceFromCSVKeys } from "./constants";

interface InvoiceFromCSV {
  INVOICE_ID      : number;
  VENDOR_ID       : number;
  INVOICE_NUMBER  : string;
  INVOICE_DATE    : Date;
  INVOICE_TOTAL   : number;
  PAYMENT_TOTAL   : number;
  CREDIT_TOTAL    : number;
  BANK_ID         : number;
  INVOICE_DUE_DATE: Date;
  PAYMENT_DATE?   : Date;
  CURRENCY        : string;
}

const getCurrency = (currency:string) => {
  switch (currency) {
    case "USD":
      return Currency.USD        
    case "EUR":
      return Currency.EUR
    case "CLP":
      return Currency.CLP
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatInvoice = (invoiceFromCSV: {[key: string]: any}): Invoice => {
  const numberFields = ["INVOICE_ID", "VENDOR_ID", "INVOICE_TOTAL", "PAYMENT_TOTAL", "CREDIT_TOTAL", "BANK_ID"]
  const dateFields = ["INVOICE_DATE", "INVOICE_DUE_DATE", "PAYMENT_DATE"]

  const obj = <Invoice>{}

  for (const key in invoiceFromCSV) {
    if (Object.prototype.hasOwnProperty.call(invoiceFromCSV, key)) {
      let value = invoiceFromCSV[key]

      if(value)
        if(numberFields.includes(key)){
          value = Number(value)
        }else if(dateFields.includes(key)){
          value = new Date(value)
        }else if(key === "CURRENCY"){
          value = getCurrency(value)
        }

      const oldKey = key as keyof InvoiceFromCSV
      const newKey = invoiceFromCSVKeys[key as keyof InvoiceFromCSV]

      delete Object.assign(obj, {[newKey]: value })[oldKey];
    }
  }

  return obj
}
