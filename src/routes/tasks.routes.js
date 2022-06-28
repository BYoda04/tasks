const { 
    getItems, 
    createItem, 
    getItem, 
    updateItem, 
    deleteItem 
} = require('../controllers/tasks');
const { tasksValidator, statusValidator } = require('../validators/tasksValidator');

const tasksRouter = require('express').Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
tasksRouter.get("/tasks",getItems);
tasksRouter.get("/tasks/:status", statusValidator,getItem);
tasksRouter.post("/tasks", tasksValidator,createItem);
tasksRouter.patch("/tasks/:id",updateItem);
tasksRouter.delete("/tasks/:id",deleteItem);

module.exports = tasksRouter;