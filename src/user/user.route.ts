import { Router } from 'express'

import { signup, login } from './user.controller'

const UserRoute = Router().post('/signup', signup).post('/login', login)

export default UserRoute
