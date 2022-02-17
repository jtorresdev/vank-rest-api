import express from 'express'
import config from 'config'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import connectMongoDB from './db'

import routes from './routes/v1'

import logger from './utils/logger'
import initAgenda from './utils/agenda'
import { swaggerOptions } from './utils/constants'

const app = express()

const port = config.get<number>('port')

initAgenda()

app.use(cors())
app.use(express.json())

const specs = swaggerJSDoc(swaggerOptions)

app.use('/api/v1', routes)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`)

  await connectMongoDB()
})