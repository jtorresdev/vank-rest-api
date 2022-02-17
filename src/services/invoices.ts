import config from 'config'
import fetch from 'node-fetch'
import csvtojson from 'csvtojson'
import { Currency } from '../db/models/customers'
import InvoiceModel, { Invoice } from '../db/models/invoices'
import { formatInvoice } from '../utils/format'
import dayjs from 'dayjs'
import { convertCurrency } from '../utils/currency'
import Customers from './customers'

export interface GetInvoicesFilters {
  vendorId: number;
  invoiceDate: string;
  currency?: Currency
}

class Invoices {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetchInvoices(invoicesSourceUri: string): Promise<string> {
    if(!invoicesSourceUri) throw new Error('Invoices csv source is required')

    const fetchCSV = await (await fetch(invoicesSourceUri)).text()

    const invoicesJSON = await csvtojson().fromString(fetchCSV)
    
    const invoicesParsed = invoicesJSON.map((invoice) => formatInvoice(invoice))

    const saveInvoices = await InvoiceModel.insertMany(invoicesParsed)

    return `${saveInvoices.length} invoices saved`
  }

  async getInvoices(internalCode: string, {vendorId, invoiceDate, currency}: GetInvoicesFilters): Promise<Invoice[]> {
    const customersService = new Customers()
    
    const baseCurrency = currency || await customersService.getCurrencyByInternalCode(internalCode)

    const {baseUri, token} = config.get('currencyConverter')

    const toConvert = Object.values(Currency)
      .filter(currency => currency !== baseCurrency)
      .map(currency => {
        return `${baseCurrency}_${currency}`
      })
        
    const rates = await (await fetch(`${baseUri}/convert?q=${toConvert.join(',')}&compact=ultra&apiKey=${token}`)).json()

    const date = dayjs(invoiceDate)

    const invoices = await InvoiceModel
      .find({
        vendorId,
        invoiceDate: {
          $gte: date.startOf('day').toDate(),
          $lte: date.endOf('day').toDate()
        }
      })
      .select({
        invoiceId    : 1,
        vendorId     : 1,
        invoiceNumber: 1,
        invoiceTotal : 1,
        paymentTotal : 1,
        creditTotal  : 1,
        bankId       : 1,
        currency     : 1
      })
      .lean()
        
    return invoices.map((invoice: Invoice) => {
      const {invoiceTotal, paymentTotal, creditTotal, currency} = invoice

      if(currency === baseCurrency) return invoice

      const rate = rates[`${baseCurrency}_${currency}`]

      return {
        ...invoice,
        invoiceTotal: convertCurrency(rate, invoiceTotal), 
        paymentTotal: convertCurrency(rate, paymentTotal), 
        creditTotal : convertCurrency(rate, creditTotal),
        currency    : Currency[baseCurrency]
      }
    })
  }
}

export default Invoices