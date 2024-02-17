import Joi from "joi";
export const addToAddressVal = Joi.object({ 
    street: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    phone: Joi.string().required().trim(),
})
export const updateAddressVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    phone: Joi.string().trim(),
})
export const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
})