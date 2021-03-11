const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email })
    // ПРоверить наличие пользователя
    if (candidate) {
        // ПРоверка пароля
        try {
            const password = req.body.password;
            const passResult = bcrypt.compareSync(password, candidate.password)
            if (passResult) {
                // Создать токен
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id
                }, keys.JWT, {expiresIn: 60 * 60})
                res.status(201).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(409).json('Введет неверный пароль!')
            }
        } catch (error) {
            res.status(404).json('Сервер входа недоступен')
        }
    } else {
        res.status(401).json('Пользователь с таким email не обнаружен!')
    }
    // 
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        // Проверить наличие пользователя. Если такой есть - выевсти ошибку
        res.status(409).json({
            meaasge: 'Пользователь с таким email уже существует. Попробуйте другой.'
        })
    } else {
        // Создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (err) {
            // Обработать ошибку
        }
    }
}