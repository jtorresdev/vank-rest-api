import {Schema, model} from 'mongoose'

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CLP = 'CLP'
}

export interface Customer {
  companyName: string;
  internalCode: string;
  idTax: string;
  currency: Currency;
  apiQuota?: number;
  bankRecords?: number[];
}
  
const CustomerSchema = new Schema<Customer>({
  companyName : {type: String, required: true},
  internalCode: {type: String, required: true, unique: true},
  idTax       : {type: String, required: true},
  currency    : {type: String, required: true, enum: Object.values(Currency)},
  apiQuota    : {type: Number, default: 0},
  bankRecords : [ {type: Number} ]
})

const CustomerModel = model<Customer>('Customer', CustomerSchema)

export default CustomerModel