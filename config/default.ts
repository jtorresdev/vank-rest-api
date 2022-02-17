import 'dotenv/config'

export default {
  port             : process.env.PORT,
  dbUri            : process.env.MONGO_URI,
  invoicesCSVsource: process.env.INVOICES_CSV_SOURCE,
  dbUriAgenda      : process.env.AGENDA_MONGO_URI,
  currencyConverter: {
    baseUri: process.env.CURRENCY_CONVERTER_API,
    token  : process.env.CURRENCY_CONVERTER_TOKEN
  }
}