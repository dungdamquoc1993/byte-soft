import Joi from 'joi';

const createVote = Joi.object({
    candidate_id: Joi.string().required(),
    user_id: Joi.string().required()
});

const getVote = Joi.object({
    candidate_id: Joi.string().required()
});

export default { createVote, getVote };
