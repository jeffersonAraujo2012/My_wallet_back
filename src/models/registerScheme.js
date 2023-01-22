import Joi from "joi";

export default Joi.object({
  description: Joi.string().required(),
  value: Joi.number().min(0).required(),
  type: Joi.string().valid("in", "out").required()
})