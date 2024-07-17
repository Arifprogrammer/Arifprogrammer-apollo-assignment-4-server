import { Router } from 'express'
import { productRouter } from '../modules/product/product.route'

export const router = Router()

const moduleRoutes = [
  {
    path: '/products',
    route: productRouter,
  },
]

// biome-ignore lint/complexity/noForEach: <explanation>
moduleRoutes.forEach(route => router.use(route.path, route.route))
