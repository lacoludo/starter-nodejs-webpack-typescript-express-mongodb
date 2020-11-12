import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'

import Database from './database'
import ThingRoute from './thing/thing.route'
import UserRoute from './user/user.route'
import { PORT } from './env'

Database

express()
  .use(logger('dev'))
  .use(bodyParser.json())
  .use('/images', express.static(path.join(__dirname, 'images')))
  .use('/things', ThingRoute)
  .use('/auth', UserRoute)
  .listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`))
  .on('error', err => {
    console.error(`❌ Server not ready`)
    console.error(err)
  })
