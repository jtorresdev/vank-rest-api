import express from 'express'
import config from 'config'
import connectMongoDB from './db'
import logger from './utils/logger'
import Invoices from './services/invoices'

const app = express()

const port = config.get<number>('port')

app.get('/', (_, res) => {
  res.send({success: false})
})

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`)

  await connectMongoDB()
})

const invoices = new Invoices()

invoices.fetchInvoices()