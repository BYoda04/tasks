// Models
const { Tasks } = require('../models/tasks');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { day } = require('../utils/getDay');
const { Users } = require('../models/users');

const getItems = catchAsync(async (req,res,next)=>{
	const data = await Tasks.findAll({
		include:Users
	});

	res.status(200).json({
		status: 'succes',
		data
	});
});

const getItem = catchAsync(async (req,res,next)=>{
	const { status } = req.params;

	const task = await Tasks.findAll({ 
		where: { status },
		include:Users
	});

	if (!task) {
		return res.status(404).json({
			status: 'error',
			message: 'user not found'
		});
		
	};

	res.status(200).json({
		status: 'success',
		task
	});
});

const createItem = catchAsync(async (req,res,next)=>{
	const { userId,title,limitDate } = req.body;
	const roles = await Tasks.create({
		userId,
		title,
		startDate:day,
		limitDate
	})
	
	res.status(201).json({
		status: 'succes',
		roles
	})
});

const updateItem = catchAsync(async (req,res,next)=>{
	const { task } = req;
	const { status } = req;
	
	await task.update({ 
		finishDate:day,
		status 
	});
	
	return res.status(204).json({ status: 'update' });
});

const deleteItem = catchAsync(async (req,res,next)=>{
	const { task } = req;
	
	await task.update({ status:"cancelled" });

	return res.status(204).json({ status: 'cancelled' });
});

module.exports = {
	getItems,
	createItem,
	getItem,
	updateItem,
	deleteItem,
};
