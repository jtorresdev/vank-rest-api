import { Handler } from 'express'
import Customers from '../services/customers'

const customerService = new Customers()

export const createCustomer: Handler = async (req, res) => {
  const data = req.body

  try {
    const response = await customerService.create(data)

    res.status(200).send({ message: response })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}


export const updateCustomer: Handler = async (req, res) => {
  const data = req.body
  const { internalCode } = req.params

  try {
    const response = await customerService.update({ internalCode, data })

    res.status(200).send({ message: response })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}