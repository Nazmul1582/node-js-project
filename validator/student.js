const Joi = require("joi");

const addressValidator = Joi.object({
    district: Joi.string(),
    division: Joi.string()
})
const hobbiesValidator = Joi.array().items(
    Joi.object().keys({
        name: Joi.string(),
        position: Joi.number()
    })
)

const studentValidator = Joi.object({
    name: Joi.string().min(2).max(25),
    username: Joi.string().required().alphanum(),
    age : Joi.number(),
    class: Joi.number(),
    email: Joi.string()
    .required()
    .trim()
    .email()
    .regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    password: Joi.string().max(12).min(6).pattern(new RegExp('^[0-9a-zA-Z]{6,12}$')),
    image : Joi.string(),
    address : addressValidator,
    hobbies : hobbiesValidator
})

module.exports = studentValidator;