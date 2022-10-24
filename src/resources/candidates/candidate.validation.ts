import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().max(30).required(),
});

export default { register };
