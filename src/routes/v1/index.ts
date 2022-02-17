import { Router } from 'express'
import invoicesRouter from './invoices'
import customersRouter from './customers'

const routes = Router()

routes.use('/invoices', invoicesRouter)
routes.use('/customers', customersRouter)

export default routes