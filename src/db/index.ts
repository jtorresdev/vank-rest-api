import mongoose from 'mongoose'
import config from 'config'
import logger from '../utils/logger'

const connectMongoDB = async () => {
  const dbUri = config.get<string>('dbUri')

  try {
    await mongoose.connect(dbUri)
    logger.info('Connected to db')
  } catch (error) {
    logger.error('Could not connect to db')
  }
    
}

export default connectMongoDB