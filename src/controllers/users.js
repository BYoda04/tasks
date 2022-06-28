const { Tasks } = require("../models/tasks");
const { Users } = require("../models/users");

const getItems = async (req,res)=>{
    try {
        const data = await Users.findAll({
            include:Tasks
        });
    
        res.status(200).json({
            status: 'succes',
            data
        });
    } catch (error) {
       console.log(error);
       res.send({"status":"error"}); 
    }
}

const getItem = async (req,res)=>{
    try {
        const { id } = req.params;

        const user = await Users.findOne({ 
            where: { id },
            include:Tasks
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found'
            });
            
        };

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        console.log(error);
        res.send({status:"error"});
    }
}

const createItem = async (req,res)=>{
    try {
        const { name,email,password } = req.body;
        const users = await Users.create({
            name,
            email,
            password,
            status:"active"
        })
        
        res.status(201).json({
            status: 'succes',
            users
        })
    } catch (error) {
        console.log(error);
        res.send({status:"error"});
    }
}

const updateItem = async (req,res)=>{
    try {
        const { id } = req.params;
        const { name,email } = req.body;

        const user = await Users.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'user not exist'
            });
            
        };

        await user.update({ name,email });

        return res.status(204).json({
            status: 'update'
        });
    } catch (error) {
        console.log(error);
        res.send({status:"error"});
    }
}

const deleteItem = async (req,res)=>{
    try {
        const { id } = req.params;

        const user = await Users.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'user not exist'
            });
            
        };

        await user.update({ status:"deleted" });

        return res.status(204).json({
            status: 'deleted'
        });
    } catch (error) {
        console.log(error);
        res.send({status:"error"});
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}