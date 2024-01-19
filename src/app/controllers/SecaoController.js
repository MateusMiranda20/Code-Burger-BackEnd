
import User from '../models/User'
import Jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import authConfig from '../../config/auth'

class SecaoController {
    async store(request, response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        const erroEmailOuSenha = () => {
            return response.status(400).json({ erro: "Sua senha ou email esta incorreto" })
        }

        if (!(await schema.isValid(request.body))) {
            erroEmailOuSenha()
        }
        const { email, password } = request.body

        const user = await User.findOne({
            where: { email },
        })

        if (!user) {
            erroEmailOuSenha()
        }

        if (!(await user.checkPassword(password))) {
            erroEmailOuSenha()
        }

        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
            token: Jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        })
    }
}

export default new SecaoController()