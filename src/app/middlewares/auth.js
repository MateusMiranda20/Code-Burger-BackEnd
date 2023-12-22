import Jwt from "jsonwebtoken";
import authGonfig from '../../config/auth'

export default (request, response, next) => {
    const autToken = request.headers.authorization

    if (!autToken) {
        return response.status(401).json({ error: 'Token não aprovado' })
    }


    const token = autToken.split(' ')[1]

    try {
        Jwt.verify(token, authGonfig.secret, function (err, decoded) {
            if (err) {
                throw new Error()
            }

            request.userId = decoded.id
            request.userName = decoded.name

            return next()
        })
    } catch (err) {
        return response.status(401).json({ error: 'Token é invalido' })
    }

}

