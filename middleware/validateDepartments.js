const joi = require('joi');

const departmentSchema = joi.object({
    name: joi.string().required(),
    location: joi.string().required()
});

const validateDepartment = (req, res, next) => {
    const { error } = departmentSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).json({
            message: 'Validation failed',
            errors: errorMessages
        });
    }
    next();
};

module.exports = validateDepartment;