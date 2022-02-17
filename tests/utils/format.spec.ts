import { formatInvoice } from '../../src/utils/format'

describe('Format utils', () => {
  it('should format invoice from csv', () => {
    const invoice = {
      INVOICE_ID      : 92,
      VENDOR_ID       : 80,
      INVOICE_NUMBER  : '133560',
      INVOICE_DATE    : new Date('01-JUN-14'),
      INVOICE_TOTAL   : 175,
      PAYMENT_TOTAL   : 175,
      CREDIT_TOTAL    : 0,
      BANK_ID         : 2,
      INVOICE_DUE_DATE: new Date('20-JUN-14'),
      PAYMENT_DATE    : new Date('03-JUN-14'),
      CURRENCY        : 'CLP'
    }

    const json = formatInvoice(invoice)

    expect(json).toHaveProperty('invoiceId', 92)
    expect(json).toHaveProperty('vendorId', 80)
    expect(json).toHaveProperty('invoiceNumber', '133560')
    expect(json).toHaveProperty('invoiceDate', new Date('01-JUN-14'))
    expect(json).toHaveProperty('invoiceTotal', 175)
    expect(json).toHaveProperty('paymentTotal', 175)
    expect(json).toHaveProperty('creditTotal', 0)
    expect(json).toHaveProperty('bankId', 2)
    expect(json).toHaveProperty('invoiceDueDate', new Date('20-JUN-14'))
    expect(json).toHaveProperty('paymentDate', new Date('03-JUN-14'))
    expect(json).toHaveProperty('currency', 'CLP')
  })
})