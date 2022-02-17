import 'dotenv/config'

export default {
  dbUri            : process.env.MONGO_URI_TEST,
  currencyConverter: {
    baseUri: process.env.CURRENCY_CONVERTER_API,
    token  : process.env.CURRENCY_CONVERTER_TOKEN
  }
}