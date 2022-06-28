const { app } = require('./app');

// Models
const { Users } = require('./models/users');
const { Tasks } = require('./models/tasks');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations
// 1 User <----> M Post
Users.hasMany(Tasks,{ foreignKey:'userId' });
Tasks.belongsTo(Users);

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4001, () => {
	console.log('Express app running!!');
});
