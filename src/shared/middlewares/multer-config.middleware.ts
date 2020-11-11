import multer from 'multer'

type Props = {
  [key: string]: string
}

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
} as Props

const MulterConfigMiddleware = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images')
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_')
      const extension = MIME_TYPES[file.mimetype]
      callback(null, name + Date.now() + '.' + extension)
    }
  })
}).single('image')

export default MulterConfigMiddleware