import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from './user.model'

export const signup = async (req: Request, res: Response) => {
  await bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new UserModel({
      email: req.body.email,
      password: hash
    })
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: 'User added successfully!'
        })
      })
      .catch(error => {
        res.status(500).json({
          error: error
        })
      })
  })
}

export const login = async (req: Request, res: Response) => {
  await UserModel.findOne({ email: req.body.email })
    .then((user: any) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            })
          }
          const token = jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
          })
          res.status(200).json({
            userId: user._id,
            token: token
          })
        })
        .catch(error => {
          res.status(500).json({
            error: error
          })
        })
    })
    .catch(error => {
      res.status(500).json({
        error: error
      })
    })
}
