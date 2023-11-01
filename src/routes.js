import { Router } from 'express'
import multer from 'multer'
import multeConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SecaoController from './app/controllers/SecaoController'
import ProductController from './app/controllers/ProductController'
import CategotyController from './app/controllers/CategotyController'

import authMiddlewares from './app/middlewares/auth'

const upload = multer(multeConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/secao', SecaoController.store)

routes.use(authMiddlewares);

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategotyController.store)
routes.get('/categories', CategotyController.index)

export default routes
