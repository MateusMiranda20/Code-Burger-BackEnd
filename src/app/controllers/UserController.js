/* 
    Store => Cadastrar / Adicionar
    Index => Listar vários
    Show => Listar apenas um 
    Update => Atualizar
    Delete => Deletar
*/

import User from '../models/User'

import * as Yup from 'yup'

import { v4 } from 'uuid'

class UserController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })  

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (ero) {
            return response.status(400).json({ error: ero.errors })
        }

        const { name, email, password, admin } = request.body

        const userExit = await User.findOne({
            where: { email },
        })

        if (userExit) {
            return response.status(400).json({ erro: 'Usuario já cadastrado'})
        }

        console.log(userExit)
        const user = {

            id: v4(),
            name,
            email,
            password,
            admin,
        }

        await User.create(user)

        return response.status(201).json(user)
    }
}

export default new UserController()