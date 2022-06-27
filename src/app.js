require('dotenv').config();
const express = require('express');
const cors = require('cors');

//conecction database
const { connectDB } = require('./data/database');

//routes
//error TypeError: Router.use() requires a middleware function but got a undefined
const { usersRouter } = require('./routes/users.routes');
const { tasksRouter } = require('./routes/tasks.routes');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4001;

//invocate routes
app.use("/api/v1",require('./routes/users.routes'));
app.use("/api/v1",require('./routes/tasks.routes'));

app.listen(port,()=>{
    console.log(`Server on Port http://localhost:${port}/api/v1/`);
});

connectDB();