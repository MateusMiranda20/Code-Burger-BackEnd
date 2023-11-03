import Product from '../models/Product'
import * as Yup from 'yup'

class ProductController {
    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required()
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (erro) {
            return response.status(400).json({ error: erro.errors })
        }

        const { filename: path } = request.file
        const { name, price, category_id } = request.body

        const product = await Product.create({
            name,
            price,
            category_id, 
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