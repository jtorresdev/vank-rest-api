import { Router } from 'express'
import { getInvoices } from '../../controllers/invoices'
import { cacheMiddleware } from '../../middleware'

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    Invoice:
 *      type: object
 *      properties:
 *        invoiceId:
 *          type: integer
 *        vendorId:
 *          type: integer
 *        invoiceinteger:
 *          type: string
 *        invoiceDate:
 *          type: string
 *        invoiceTotal:
 *          type: integer
 *        paymentTotal:
 *          type: integer
 *        creditTotal:
 *          type: integer
 *        bankId:
 *          type: integer
 *        invoiceDueDate:
 *          type: string
 *        paymentDate:
 *          type: string
 *        currency:
 *          type: string
 * 
 *      required:
 *        - invoiceId
 *        - vendorId
 *        - bankId
 *        - currency  
 *     
 *      example:
 *        invoiceId: 1
 *        vendorId: 34
 *        invoiceinteger: QP58872
 *        invoiceDate: 2014-02-25
 *        invoiceTotal: 116.54
 *        paymentTotal: 116.54
 *        creditTotal: 0
 *        bankId: 4
 *        invoiceDueDate: 2014-04-22
 *        paymentDate: 2014-04-11
 *        currency: CLP
 */


/**
 * @swagger
 * /api/v1/invoices/{internalCode}:
 *  get:
 *    summary: Get invoices of customer
 *    tags:
 *      - invoices
 *    parameters:
 *      - in: path
 *        name: internalCode
 *        schema:
 *          type: string
 *        example: ABC123
 *        required: true
 *      - in: query
 *        name: vendorId
 *        schema:
 *          type: integer
 *        required: true
 *        example: 34
 *      - in: query
 *        name: invoiceDate
 *        schema:
 *          type: string
 *        example: 2014-02-25
 *        required: true
 *      - in: query
 *        name: currency
 *        schema: 
 *          type: string
 *        example: CLP
 *    responses:
 *      200:
 *        description: array of invoices 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  invoices:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Invoice'
 */
router.get('/:internalCode', cacheMiddleware.route(), getInvoices)

export default router