import { Router } from 'express'
import multer from 'multer'
import multeConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SecaoController from './app/controllers/SecaoController'
import ProductController from './app/controllers/ProductController'
import CategotyController from './app/controllers/CategotyController'

import authMiddlewares from './app/middlewares/auth'
import OrderController from './app/controllers/OrderController'

const upload = multer(multeConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/secao', SecaoController.store)

routes.use(authMiddlewares);

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategotyController.store)
routes.get('/categories', CategotyController.index)
routes.post('/categories/:id', upload.single('file'), CategotyController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)


export default routes
