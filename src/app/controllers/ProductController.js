import Product from '../models/Product'
import * as Yup from 'yup'

class ProductController {
    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            categoria: Yup.string().required()
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (erro) {
            return response.status(400).json({ error: erro.errors })
        }

        const { filename: path } = request.file
        const { name, price, categoria } = request.body

        const product = await Product.create({
            name,
            price,
            categoria,
            path,
        });

        return response.json({product })
    }

    async index(request, response){
        const products = await Product.findAll()

        return response.json(products)
    }
}

export default new ProductController()