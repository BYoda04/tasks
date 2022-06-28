const { check, body, validationResult, checkSchema } = require('express-validator');

const checkResult = (req,res,next)=>{
    const { errors } = validationResult(req);

    if (!errors.isEmpty()) {
        const message = errors.array().map(error=>error.msg);

        return res.status(400).json({
            status:"error",
            message
        })
    };

    next()
};

const statusValidator = (req,res,next)=>{
    check('status')
};

const tasksValidator = (req,res,next)=>{
    body('userId').notEmpty().withMessage('userId cannot be empty'),
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('limitDate').isDate().withMessage('Limit date must be a day'),
    checkResult
};

module.exports = {
    tasksValidator,
    statusValidator
};