import { model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserModel = model(
  'User',
  new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }).plugin(uniqueValidator)
)

export default UserModel
