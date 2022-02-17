import { Router } from 'express'
import { createCustomer, updateCustomer } from '../../controllers/customers'

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
 *      type: object
 *      properties:
 *        companyName:
 *          type: string
 *        internalCode:
 *          type: string
 *        idTax:
 *          type: string
 *        currency:
 *          type: string
 *        apiQuota:
 *          type: integer
 *        bankRecords:
 *          type: array
 *          items:
 *            type: integer
 * 
 *      required:
 *        - companyName
 *        - internalCode
 *        - idTax
 *        - currency  
 *     
 *      example:
 *        companyName: Compañia
 *        internalCode: ABC123
 *        idTax: DFG456
 *        currency: USD
 *        apiQuota: 10000
 *        bankRecords: [10, 20, 30]
 */

/**
 * @swagger
 * /api/v1/customers/create:
 *  post:
 *    summary: Create a new customer
 *    tags:
 *      - customers
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Customer'
 *    responses:
 *      200:
 *        description: message 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: 
 *                  type: string
 */
router.post('/create', createCustomer)

/**
  * @swagger
  * /api/v1/customers/update/{internalCode}:
  *  put:
  *    summary: Update a customer
 *    tags:
 *      - customers
  *    parameters:
  *      - in: path
  *        name: internalCode
  *        schema:
  *          type: string
  *        description: internalCode of customer
  *        example: ABC123
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            properties:
  *              idTax: 
  *                type: string
  *              currency:
  *                type: string
  *    responses:
  *      200:
  *        description: message 
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                message: 
  *                  type: string
  */
router.put('/update/:internalCode', updateCustomer)

export default router