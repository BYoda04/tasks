const { Tasks } = require("../models/tasks");
const day = require("../utils/getDay");

const getItems = async (req,res)=>{
    try {
        const data = await Tasks.findAll();
    
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
        const { status } = req.params;

        const task = await Tasks.findAll({ where: { status } });

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
    } catch (error) {
        console.log(error);
        res.send({status:"error"});
    }
}

const createItem = async (req,res)=>{
    try {
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
    } catch (error) {
        console.log(error);
        res.send({status:"error"});
    }
}

const updateItem = async (req,res)=>{
    try {
        const { id } = req.params;

        const task = await Tasks.findOne({ where: { id } });

        if (!task) {
            res.status(404).json({
                status: 'error',
                message: 'user not exist'
            });
            
        };

        await task.update({ 
            finishDate:day,
            status:"completed" 
        });

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

        const task = await Tasks.findOne({ where: { id } });

        if (!task) {
            res.status(404).json({
                status: 'error',
                message: 'user not exist'
            });
            
        };

        await task.update({ status:"cancelled" });

        return res.status(204).json({
            status: 'cancelled'
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