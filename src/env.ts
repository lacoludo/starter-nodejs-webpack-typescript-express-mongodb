import { config } from 'dotenv'

config()

export const PORT = process.env.PORT

export const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI
