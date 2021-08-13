const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

// WITHOUT TRY-CATCH BLOCK
const getAllTasks = asyncWrapper( async (req, res)=>{
    // res.send("get all task");
    const tasks = await Task.find({});
    res.status(200).json({tasks});
})

const createTask = asyncWrapper(async (req, res)=>{
    // res.send("create tasks");
    const task = await Task.create(req.body);
    res.status(201).json({task});
})

const getTask = asyncWrapper(async (req, res, next)=>{
    // res.json({id: req.params.id});
    const {id: taskID} = req.params;
    // const taskID = req.params.id;    // MY METHOD
    const task = await Task.findOne({_id : taskID});

    if(!task){   // FOR NULL TASK
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // return res.status(404).json({msg : `No task with id : ${taskID}`});
    }

    res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req, res, next)=>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id : taskID});
    
    if(!task){   // FOR NULL TASK

        return next(createCustomError(`No task with id : ${taskID}`, 404))

        /*   // REMOVED BECAUSE WE CREATED OUR NEW CUSTOM ERROR CLASS FOR EASY ERROR HANDLING
        const error = new Error('Not Found');
        error.status = 404;
        return next(error);
        */
        // return res.status(404).json({msg : `No task with id : ${taskID}`});
    }

    res.status(200).json({task});
    // res.send("delete task");
})

const updateTask = asyncWrapper(async (req, res, next)=>{
    const {id:taskID} = req.params;

    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new:true,
        runValidators:true
    });
    
    if(!task){   // FOR NULL TASK
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // return res.status(404).json({msg : `No task with id : ${taskID}`});
    }

    res.status(200).json({id:taskID, data:req.body});
    // res.send("update task");
})

/*      // WITHOUT USING ASYNCWRAPPER FUNCTION: WITH TRY-CATCH BLOCK
const getAllTasks = asyncWrapper( async (req, res)=>{
    // res.send("get all task");
    try {
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
})

const createTask = async (req, res)=>{
    // res.send("create tasks");
    try{
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

const getTask = async (req, res)=>{
    // res.json({id: req.params.id});
    try {
        const {id: taskID} = req.params;
        // const taskID = req.params.id;    // MY METHOD
        const task = await Task.findOne({_id : taskID});

        if(!task){   // FOR NULL TASK
            return res.status(404).json({msg : `No task with id : ${taskID}`});
        }

        res.status(200).json({task});
    } catch (error) {   // FOR WRONG SYNTAX
        res.status(500).json({msg: error.message});
    }
}

const deleteTask = async (req, res)=>{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id : taskID});
        
        if(!task){   // FOR NULL TASK
            return res.status(404).json({msg : `No task with id : ${taskID}`});
        }

        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error.message});        
    }
    // res.send("delete task");
}

const updateTask = async (req, res)=>{
    try {
        const {id:taskID} = req.params;

        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true,
            runValidators:true
        });
        
        if(!task){   // FOR NULL TASK
            return res.status(404).json({msg : `No task with id : ${taskID}`});
        }

        res.status(200).json({id:taskID, data:req.body});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    // res.send("update task");
}
*/

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}