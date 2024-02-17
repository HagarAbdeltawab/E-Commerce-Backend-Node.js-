import Joi from "joi";
export const createBrandVal = Joi.object({ 
    name: Joi.string().min(2).max(150).required().trim(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).required()
})
export const updateBrandVal = Joi.object({
    name: Joi.string().min(2).max(150).trim(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }),
    id: Joi.string().hex().length(24).required()
})
export const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
})