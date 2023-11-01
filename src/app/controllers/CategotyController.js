import Category from '../models/Category'
import * as Yup from 'yup'

class CategoryController {
    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (erro) {
            return response.status(400).json({ error: erro.errors })
        }

        const { name } = request.body

        const categoryExist = await Category.findOne({
            where: {
                name,
            },
        })

        if (categoryExist) {
            return response.status(400).json({ error: 'Category already exists' })
        }

        const { id } = await Category.create({ name });
        
        return response.json({ id })
    }

    async index(request, response) {
        const category = await Category.findAll()

        return response.json(category)
    }
}

export default new CategoryController()