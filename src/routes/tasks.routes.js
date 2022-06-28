const express = require('express');

//controllers
const { 
    getItems, 
    createItem, 
    getItem, 
    updateItem, 
    deleteItem 
} = require('../controllers/tasks');

//validators
const { statusValidator, taskValidator, finishDateValidator } = require('../validators/taskValidator');

//middlewares
const { taskExists, limitDate } = require('../middlewares/tasks');

const tasksRouter = express.Router()

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
tasksRouter.get("/",getItems);
tasksRouter.get("/:status", statusValidator,getItem);
tasksRouter.post("/", taskValidator,createItem);
tasksRouter.patch("/:id", taskExists, finishDateValidator, limitDate,updateItem);
tasksRouter.delete("/:id", taskExists,deleteItem);

module.exports = { tasksRouter };