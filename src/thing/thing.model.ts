import { model, Schema } from 'mongoose'

const ThingModel = model(
  'Thing',
  new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  })
)

export default ThingModel
