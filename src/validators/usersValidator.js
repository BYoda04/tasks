const { check, body,validationResult } = require('express-validator');

const checkResult = (req,res,next)=>{
    const { errors } = validationResult(req).throw;

    if (!errors.isEmpty()) {
        const message = errors.array().map(error=>error.msg);

        return res.status(400).json({
            status:"error",
            message
        })
    };

    next()
};

const usersValidator = (req,res,next)=>{
    check('name').exists().notEmpty().withMessage('Name cannot be empty'),
    check('email').exists().isEmail().withMessage('email not valid'),
    check('password').exists().isAlphanumeric().isLength({min:5}).withMessage('password minlength 5'),
    checkResult
};

module.exports = {
    usersValidator
};