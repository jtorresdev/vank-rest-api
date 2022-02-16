import csvtojson from 'csvtojson'
import fetch from 'node-fetch'
import InvoiceModel from '../db/models/invoices';
import { formatInvoice } from '../utils/format';

const {INVOICES_CSV_SOURCE} = process.env

class Invoices {
  /*async getInvoicesByVendorId(vendorId: string, invoiceDate: Date, currency?: Currency){
    try {
      
    } catch (error) {
      return 'ERROR'
    }
  }*/

  async fetchInvoices(){
    try {
      if(!INVOICES_CSV_SOURCE) throw new Error('Invoices csv source is required')

      const fetchCSV = await fetch(INVOICES_CSV_SOURCE, {method: 'GET'});
      const invoices = await csvtojson().fromString(await fetchCSV.text())

      const invoicesParsed = invoices.map((invoice) => formatInvoice(invoice))

      const saveInvoices = await InvoiceModel.insertMany(invoicesParsed)

      return `${saveInvoices.length} invoices saved`
    } catch (error) {
      return error.message
    }
  }
}

export default Invoices