const mongodb = require('../data/database.js');
const ObjectID= require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Employees']
    try {
        const result = await mongodb.getDatabase().db().collection('employees').find();
        result.toArray().then((employees)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employees);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while getting the employees", error: error.message });
    }
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Employees']
    try {
        const employeeId = new ObjectID(req.params.id);
        const result = await mongodb.getDatabase().db().collection('employees').find({_id: employeeId});
        result.toArray().then((employees)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employees[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while getting the employee", error: error.message });
    }
};

const createEmployee = async(req, res) => {
    //#swagger.tags=['Employees']
    try {
        const employee ={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            address:req.body.address,
            email:req.body.email,
            position:req.body.position,
            department:req.body.department,
            birthday:req.body.birthday
        };
        // Check if the department exists
        const department = employee.department;
        const departmentExists = await mongodb.getDatabase().db().collection('departments').findOne({name: department});
        if (!departmentExists) {
            return res.status(404).json({ message: `Department '${department}' does not exist. Please use a valid department` });
        }
        // If the department exists, proceed to insert the employee
        const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
        if (response.acknowledged){
            res.status(201).json(response);
        }
        else
        {
            res.status(500).json(response.error || "An error occured while adding the employee");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the employee", error: error.message });
    }
};

const updateEmployee = async(req, res) => {
    //#swagger.tags=['Employees']
    try {
        const employeeId = new ObjectID(req.params.id);
        const employee ={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            address:req.body.address,
            email:req.body.email,
            position:req.body.position,
            department:req.body.department,
            birthday:req.body.birthday
        };
        // Check if the department exists
        const department = employee.department;
        const departmentExists = await mongodb.getDatabase().db().collection('departments').findOne({name: department});
        if (!departmentExists) {
            return res.status(404).json({ message: `Department '${department}' does not exist. Please use a valid department` });
        }
        // If the department exists, proceed to update the employee
        const response = await mongodb.getDatabase().db().collection('employees').replaceOne({_id: employeeId},employee);
        if (response.modifiedCount > 0){
            res.status(200).json(response);
        }
        else
        {
            res.status(500).json(response.error || "An error occured while updating the employee");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the employee", error: error.message });
    }
}

const deleteEmployee = async(req, res) => {
    //#swagger.tags=['Employees']
    try {
        const employeeId = new ObjectID(req.params.id);
        const response = await mongodb.getDatabase().db().collection('employees').deleteOne({_id: employeeId});
        if (response.deletedCount > 0){
            res.status(204).json(response);
        }
        else
        {
            res.status(500).json(response.error || "An error occured while deleting the employee");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the employee", error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
};