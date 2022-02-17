import config from 'config'
import fetch, { Response } from 'node-fetch'
import connectMongoDB from '../../src/db'
import { Currency } from '../../src/db/models/customers'
import InvoiceModel from '../../src/db/models/invoices'
import Invoices from '../../src/services/invoices'

jest.mock('node-fetch')

describe('Invoices service', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>

  beforeAll(async () => {
    await connectMongoDB()
  })

  beforeEach(async () => {
    await InvoiceModel.insertMany([
      {
        'invoiceId'     : 1,
        'vendorId'      : 34,
        'invoiceNumber' : 'QP58872',
        'invoiceDate'   : new Date('25-FEB-14'),
        'invoiceTotal'  : 116.54,
        'paymentTotal'  : 116.54,
        'creditTotal'   : 0,
        'bankId'        : 4,
        'invoiceDueDate': new Date('22-APR-14'),
        'currency'      : 'CLP'
      },
      {
        'invoiceId'     : 2,
        'vendorId'      : 34,
        'invoiceNumber' : 'Q545443',
        'invoiceDate'   : new Date('14-MAR-14'),
        'invoiceTotal'  : 1083.58,
        'paymentTotal'  : 1083.58,
        'creditTotal'   : 0,
        'bankId'        : 4,
        'invoiceDueDate': new Date('23-MAY-14'),
        'currency'      : 'USD'
      },
      {
        'invoiceId'     : 3,
        'vendorId'      : 110,
        'invoiceNumber' : 'P-0608',
        'invoiceDate'   : new Date('11-APR-14'),
        'invoiceTotal'  : 20551.18,
        'paymentTotal'  : 0,
        'creditTotal'   : 1200,
        'bankId'        : 5,
        'invoiceDueDate': new Date('30-JUN-14'),
        'currency'      : 'USD'
      }
    ])
  })

  afterEach(async() => {
    await InvoiceModel.deleteMany({})
  })

  const invoicesService = new Invoices()

  it('save invoices from csv', async () => {
    // eslint-disable-next-line max-len
    const invoicesFromCSV = `INVOICE_ID,VENDOR_ID,INVOICE_NUMBER,INVOICE_DATE,INVOICE_TOTAL,PAYMENT_TOTAL,CREDIT_TOTAL,BANK_ID,INVOICE_DUE_DATE,PAYMENT_DATE,CURRENCY
    1,34,QP58872,25-FEB-14,116.54,116.54,0,4,22-APR-14,11-APR-14,CLP
    2,34,Q545443,14-MAR-14,1083.58,1083.58,0,4,23-MAY-14,14-MAY-14,USD
    3,110,P-0608,11-APR-14,20551.18,0,1200,5,30-JUN-14,,USD
    4,110,P-0259,16-APR-14,26881.4,26881.4,0,3,16-MAY-14,12-MAY-14,CLP
    5,81,MABO1489,16-APR-14,936.93,936.93,0,3,16-MAY-14,13-MAY-14,USD`

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = jest.fn() as jest.MockedFunction<any>
    text.mockResolvedValue(invoicesFromCSV)
    mockFetch.mockResolvedValue({ ok: true, text } as Response)
    
    const invoicesCSVsource = config.get<string>('invoicesCSVsource')

    const savedInvoices = await invoicesService.fetchInvoices(invoicesCSVsource)

    expect(savedInvoices).toBe('5 invoices saved')
  })

  it('should throw an error if invoices csv source is empty', async () => {
    try {
      await invoicesService.fetchInvoices('')
    } catch (error) {
      expect(error.message).toBe('Invoices csv source is required')
    }
  })

  it('get customer invoices with currency defined', async() => {
    const internalCode = 'ABC123'
    const vendorId = 34
    const invoiceDate = '2014-02-25'
    const currency = 'USD' as Currency

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json = jest.fn() as jest.MockedFunction<any>
    json.mockResolvedValue({USD_CLP: 798.050097, USD_EUR: 0.878299})
    mockFetch.mockResolvedValue({ ok: true, json } as Response)

    const invoices = await invoicesService.getInvoices(internalCode, {vendorId, invoiceDate, currency})

    expect(invoices[0].invoiceId).toBe(1)
    expect(invoices[0].vendorId).toBe(34)
    expect(invoices[0].invoiceNumber).toBe('QP58872')
    expect(invoices[0].invoiceTotal).toBe(116.54 / 798.050097)
    expect(invoices[0].paymentTotal).toBe(116.54 / 798.050097)
    expect(invoices[0].creditTotal).toBe(0)
    expect(invoices[0].bankId).toBe(4)
    expect(invoices[0].currency).toBe('USD')
  })
})