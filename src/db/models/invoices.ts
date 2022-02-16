import {Schema, model} from 'mongoose'
import { Currency } from './customers';

export interface Invoice {
  invoiceId: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: Date;
  invoiceTotal: number;
  paymentTotal: number;
  creditTotal: number;
  bankId: number;
  invoiceDueDate: Date;
  paymentDay?: string;
  currency: Currency;
}

const InvoiceSchema = new Schema<Invoice>({
  invoiceId     : {type: Number, required: true},
  vendorId      : {type: Number, required: true},
  invoiceNumber : {type: String},
  invoiceDate   : {type: Date },
  invoiceTotal  : {type: Number},
  paymentTotal  : {type: Number, default: 0},
  creditTotal   : {type: Number, default: 0},
  bankId        : {type: Number, required: true},
  invoiceDueDate: {type: Date},
  paymentDay    : {type: String},
  currency      : {type: String, enum: Object.values(Currency)}
})


const InvoiceModel = model<Invoice>('Invoice', InvoiceSchema)

export default InvoiceModel