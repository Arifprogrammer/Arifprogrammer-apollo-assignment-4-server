import express from 'express'
import {
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  insertProduct,
  updateProduct,
  updateProducts,
} from './product.controller'

const router = express.Router()

router.post('/', insertProduct)
router.get('/', getAllProducts)
router.get('/:productId', getSingleProduct)
router.put('/:productId', updateProduct)
router.put('/', updateProducts)
router.delete('/:productId', deleteProduct)

export const productRouter = router
