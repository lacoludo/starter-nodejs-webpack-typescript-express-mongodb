import mongoose from 'mongoose'

import { MONGODB_ATLAS_URI } from './env'

const Database = mongoose
  .connect(MONGODB_ATLAS_URI!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✔️ Connection successful: MongoDB Atlas'))
  .catch(err => {
    console.log('❌ Connection failed: MongoDB Atlas')
    console.error(err)
  })

export default Database
