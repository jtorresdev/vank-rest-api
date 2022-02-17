import CustomerModel, { Currency, Customer } from '../db/models/customers'

interface UpdateCustomerData {
  idTax  : string;
  currency: Currency
}

interface UpdateCustomerArgs {
  internalCode: string;
  data: UpdateCustomerData
}
class Customers {
  async create(customer: Customer) {
    try {
      const newCustomer = await CustomerModel.create(customer)

      if(!newCustomer) throw new Error('Error on create customer')

      return 'Customer created successfully'
    } catch (error) {
      return 'Error on create customer'
    }
  }

  async update({internalCode, data}: UpdateCustomerArgs): Promise<string> {
    if(!internalCode) throw new Error('internalCode is required')

    const updateCustomer = await CustomerModel
      .updateOne({internalCode}, {
        $set: data
      })

    if(!updateCustomer.modifiedCount) throw new Error('Error on update customer')

    return 'Customer updated successfully'
  }

  async getCurrencyByInternalCode(internalCode: string): Promise<Currency> {
    const customer = await CustomerModel.findOne({internalCode}).select({currency: 1}).lean()

    if(!customer) throw new Error('Customer not found')

    return customer.currency
  }
}

export default Customers