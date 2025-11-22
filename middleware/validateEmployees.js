const Joi = require('joi');

const employeeSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    birthday: Joi.string().allow('', null)
});

const validateEmployee = (req, res, next) => {
    const { error } = employeeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({
            message: 'Validation failed',
            errors: errorMessages
        });
    }
    next();
};

module.exports = validateEmployee;