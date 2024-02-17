import Joi from "joi";
export const createSubcategoryVal = Joi.object({ 
    name: Joi.string().min(2).max(150).required().trim(),
    category: Joi.string().hex().length(24).required(),
})
export const updateSubcategoryVal = Joi.object({
    name: Joi.string().min(2).max(150).trim(),
    category: Joi.string().hex().length(24).required(),
    id: Joi.string().hex().length(24).required()
})
export const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
})