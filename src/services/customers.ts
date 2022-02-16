import CustomerModel, { Customer } from "../db/models/customers"

class Customers {
  async create(customer: Customer){
    try {
      const newCustomer = await CustomerModel.create(customer)

      if(!newCustomer) throw new Error('Error on create customer')

      return 'Customer created successfully'
    } catch (error) {
      return 'Error on create customer'
    }
  }
}

export default Customers