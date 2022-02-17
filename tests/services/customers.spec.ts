import Customers from '../../src/services/customers'
import connectMongoDB from '../../src/db'
import CustomerModel, { Currency, Customer } from '../../src/db/models/customers'

describe('Customers service', () => {
  beforeAll(async () => {
    await connectMongoDB()
  })

  beforeEach(async () => {
    await CustomerModel.insertMany([
      {
        companyName : 'Prueba',
        internalCode: 'ABC123',
        idTax       : 'DFG567',
        currency    : Currency.USD,
        apiQuota    : 10000,
        bankRecords : [ 10, 20, 30, 40, 50 ]
      }
    ])
  })

  afterEach(async() => {
    await CustomerModel.deleteMany({})
  })

  const customersService = new Customers()
    
  it('create new customer', async () => {
    const customer: Customer = {
      companyName : 'Prueba',
      internalCode: 'ADD123',
      idTax       : 'DFG567',
      currency    : Currency.USD,
      apiQuota    : 10000,
      bankRecords : [ 10, 20, 30, 40, 50 ]
    }
    const newCustomer = await customersService.create(customer)

    expect(newCustomer).toBe('Customer created successfully')
  })

  it('should throw an error if can not create customer', async () => {
    const customer: Customer = {
      companyName : 'Prueba',
      internalCode: 'ABC123',
      idTax       : 'DFG567',
      currency    : Currency.USD,
      apiQuota    : 10000,
      bankRecords : [ 10, 20, 30, 40, 50 ]
    }

    try {
      await customersService.create(customer)
    } catch (error) {
      expect(error.message).toBe('Error on create customer')
    }

  })

  it('update customer data', async () => {
    const internalCode = 'ABC123'
    const data = {
      idTax   : 'FFF666',
      currency: Currency.EUR
    }

    const updateCustomer = await customersService.update({internalCode, data})

    expect(updateCustomer).toBe('Customer updated successfully')
  })

  it('should throw an error if can not update customer', async () => {
    const internalCode = 'ADD123'
    const data = {
      idTax   : 'FFF666',
      currency: Currency.EUR
    }

    try {
      await customersService.update({internalCode, data})
    }catch(error) {
      expect(error.message).toBe('Error on update customer')
    }
  })

  it('should throw an error if internalCode is empty', async () => {
    const internalCode = ''
    const data = {
      idTax   : 'FFF666',
      currency: Currency.EUR
    }

    try {
      await customersService.update({internalCode, data})
    } catch (error) {
      expect(error.message).toBe('internalCode is required')
    }
  })

  it('get customer currency by internalCode', async () => {
    const internalCode = 'ABC123'

    const currency = await customersService.getCurrencyByInternalCode(internalCode)

    expect(currency).toBe('USD')
  })

  it('should throw an error if can not get customer currency', async () => {
    try {
      await customersService.getCurrencyByInternalCode('')
    } catch (error) {
      expect(error.message).toBe('Customer not found')
    }
  })
})