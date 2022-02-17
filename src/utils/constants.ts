import path from 'path'

export const invoiceFromCSVKeys = {
  INVOICE_ID      : 'invoiceId',
  VENDOR_ID       : 'vendorId',
  INVOICE_NUMBER  : 'invoiceNumber',
  INVOICE_DATE    : 'invoiceDate',
  INVOICE_TOTAL   : 'invoiceTotal',
  PAYMENT_TOTAL   : 'paymentTotal',
  CREDIT_TOTAL    : 'creditTotal',
  BANK_ID         : 'bankId',
  INVOICE_DUE_DATE: 'invoiceDueDate',
  PAYMENT_DATE    : 'paymentDate',
  CURRENCY        : 'currency'
}

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info   : {
      title  : 'Vank REST API',
      version: '1.0.0'
    }
  },
  apis: [ `${path.join(__dirname, '../routes/v1/*.ts')}` ]
}