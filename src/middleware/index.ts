import redisCache from 'express-redis-cache'
import config from 'config'

const {host, port} = config.get('redis')

export const cacheMiddleware = redisCache({host, port})
