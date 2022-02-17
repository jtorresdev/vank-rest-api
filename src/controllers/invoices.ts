import { Handler, Response, Request } from 'express'
import Invoices, { GetInvoicesFilters } from '../services/invoices'

const invoicesService = new Invoices()

export const getInvoices: Handler = async (req: Request, res: Response) => {
  const data: unknown = req.query
  const {params} = req

  try {
    if (typeof params.internalCode !== 'string') throw new Error('internalCode must be a string')

    const invoices = await invoicesService.getInvoices(params.internalCode, data as GetInvoicesFilters)

    res.status(200).send({ invoices })
        
  } catch (error) {
    res.status(500).send({ message: error.message })
        
  }
}