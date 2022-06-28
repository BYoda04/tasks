const { body, validationResult, check, param, checkSchema } = require('express-validator');

//models
const { Users } = require('../models/users');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);
		errors.array().map(err => {
			console.log(err.value);
		})

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const taskValidator = [
	body('title').notEmpty().withMessage('Title cannot be empty'),
	body('userId').custom(async (value)=>{
		const user = await Users.findAll({ where: { id:value } })
		if (!user[0]) {
			return Promise.reject('User Id invalid try other Id')
		}
	}),
	body('limitDate').isDate().withMessage('Limit date cannot be empty'),
	checkResult,
];

/* const statusValidator = [
	check('status').custom(value=>{
		const state = ["active","completed","late","cancelled"];
		if (!state.includes(value)) {
			return Promise.reject(`${value} not valid parameter`)
		};
	}),
	checkResult,
] */

const statusValidator = (req,res,next)=>{
	const { status } = req.params;

	const state = ["active","completed","late","cancelled"];

	if (state.includes(status)) {
		return next()
	}
	return next(new AppError(`${status} not valid parameter`,404))
}

const finishDateValidator = [
	body('finishDate').isDate().withMessage('Introducing a day and valid hour'),
	checkResult,
]

module.exports = { 
	taskValidator,
	statusValidator,
	finishDateValidator
 };