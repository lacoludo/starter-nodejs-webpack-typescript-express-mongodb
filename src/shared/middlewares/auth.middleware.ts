import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface DataStoredInToken {
  userId: string
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies
  if (cookies && cookies.Authorization) {
    // const secret = process.env.JWT_SECRET
    try {
      // const token = req.headers.authorization?.split(' ')[1]
      const decodedToken = jwt.verify(
        cookies.Authorization,
        'RANDOM_TOKEN_SECRET'
      ) as DataStoredInToken
      const userId = decodedToken.userId
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID'
      } else {
        next()
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      })
    }
  }
}

export default AuthMiddleware
