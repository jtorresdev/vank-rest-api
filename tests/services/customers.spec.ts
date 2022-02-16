import Customers from "../../src/services/customers"
import connectMongoDB from "../../src/db"
import CustomerModel, { Currency, Customer } from "../../src/db/models/customers"

describe('Customers controller', () => {
  beforeAll(async () => {
    await connectMongoDB()
  })

  afterAll(async() => {
    await CustomerModel.deleteMany({})
  })

  const customersController = new Customers()


  const customer: Customer = {
    companyName : "Prueba",
    internalCode: "ABC123",
    idTax       : "DFG567",
    currency    : Currency.USD,
    apiQuota    : 10000,
    bankRecords : [10, 20, 30, 40, 50]
  }
    
  it('create new customer', async () => {
    const newCustomer = await customersController.create(customer)

    expect(newCustomer).toBe('Customer created successfully')
  })

  it('should throw an error if can not create customer', async () => {
    const newCustomer = await customersController.create(customer)

    expect(newCustomer).toBe('Error on create customer')
  })
})