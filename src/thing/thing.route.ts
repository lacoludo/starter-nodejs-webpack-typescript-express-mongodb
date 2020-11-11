import { Router } from 'express'

import AuthMiddleware from '../shared/middlewares/auth.middleware'
import MulterConfigMiddleware from '../shared/middlewares/multer-config.middleware'
import {
  readThings,
  createThing,
  readThing,
  updateThing,
  deleteThing
} from './thing.controller'

const ThingRoute = Router()
  .get('/', readThings)
  // .post('/', AuthMiddleware, MulterConfigMiddleware, createThing)
  // .get('/:id', AuthMiddleware, readThing)
  // .put('/:id', AuthMiddleware, MulterConfigMiddleware, updateThing)
  // .delete('/:id', AuthMiddleware, deleteThing)
  .post('/', MulterConfigMiddleware, createThing)
  .get('/:id', readThing)
  .put('/:id', MulterConfigMiddleware, updateThing)
  .delete('/:id', deleteThing)

export default ThingRoute
