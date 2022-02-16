import connectMongoDB from "../../src/db"

describe('Invoices controller', () => {
  beforeAll(async () => {
    await connectMongoDB()
  })
  
  it.todo('get customer invoices')
})