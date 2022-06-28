// Models
const { Users } = require('../models/users');
const { Tasks } = require('../models/tasks');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getItems = catchAsync(async (req, res, next) => {
	const data = await Users.findAll({
		include: Tasks,
	});

	res.status(200).json({
		status: 'success',
		data
	});
});

const getItem = catchAsync(async (req, res, next) => {
	const { user } = req;

	res.status(200).json({
		status: 'success',
		user,
	});
});

const createItem = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	const newUser = await Users.create({
		name,
		email,
		password,
	});

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const updateItem = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name,email } = req.body;

	await user.update({ name,email });

	res.status(204).json({ status: 'success' });
});

const deleteItem = catchAsync(async (req, res, next) => {
	const { user } = req;

	// await user.destroy(); 
	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getItems,
	createItem,
	getItem,
	updateItem,
	deleteItem,
};
