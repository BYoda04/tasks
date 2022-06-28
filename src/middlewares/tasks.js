// Models
const { Tasks } = require('../models/tasks');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');
const { day } = require('../utils/getDay');

const taskExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Tasks.findOne({ where: { id,status:'active' }});

	if (!task) {
		return next(new AppError('Task completed', 404));
	}

	req.task = task;
	next();
});

const limitDate = catchAsync(async (req,res,next)=>{
	const { id } = req.params;
	const { finishDate } = req.body;

	let status;
	const limitDate = await Tasks.findOne({ where: { id,status:'active' }});

	if (!limitDate) {
		return next(new AppError('Task completed', 404));
	}

	let finishDay = new Date(finishDate).getMonth();
	let limitDay = new Date(limitDate.dataValues.limitDate).getMonth();

	if (finishDay>limitDay) {
		status = 'late'
		req.status = status;
		return next()
	} else {
		finishDay = new Date(finishDate).getDate();
		limitDay = new Date(limitDate.dataValues.limitDate).getDate();
		if (finishDay>limitDay) {
			status = 'late'
			req.status = status;
			return next()
		}
	};

	status = 'completed';
	req.status = status;
	next();
})

module.exports = { 
	taskExists,
	limitDate
};