const express = require('express')

//controllers
const { 
    getItems, 
    createItem, 
    getItem, 
    updateItem, 
    deleteItem 
} = require('../controllers/users');

//validators
const { usersValidator } = require('../validators/usersValidator');

//middleware
const { userExists } = require('../middlewares/user');

const usersRouter = express.Router()

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.get("/",getItems);
usersRouter.get("/:id", userExists,getItem);
usersRouter.post("/", usersValidator,createItem);
usersRouter.patch("/:id", userExists,updateItem);
usersRouter.delete("/:id", userExists,deleteItem);

module.exports = { usersRouter };