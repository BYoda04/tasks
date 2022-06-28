const { 
    getItems, 
    createItem, 
    getItem, 
    updateItem, 
    deleteItem 
} = require('../controllers/users');
const { usersValidator } = require('../validators/usersValidator');

const usersRouter = require('express').Router();

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.get("/users",getItems);
usersRouter.get("/users/:id",getItem);
usersRouter.post("/users", usersValidator,createItem);
usersRouter.patch("/users/:id",updateItem);
usersRouter.delete("/users/:id",deleteItem);

module.exports = usersRouter;