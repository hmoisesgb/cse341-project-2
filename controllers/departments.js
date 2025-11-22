const mongodb = require('../data/database.js');
const ObjectID= require('mongodb').ObjectId;

const getAll = async(req, res) => {
    //#swagger.tags=['Departments']
    try {
        const result = await mongodb.getDatabase().db().collection('departments').find();
        result.toArray().then((departments)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(departments);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while getting the departments", error: error.message });
    }
};

const getSingle = async(req, res) => {
    //#swagger.tags=['Departments']
    try {
        const departmentId = new ObjectID(req.params.id);
        const result = await mongodb.getDatabase().db().collection('departments').find({_id: departmentId});
        result.toArray().then((departments)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(departments[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while getting the department", error: error.message });
    }
};

const createDepartment = async(req, res) => {
    //#swagger.tags=['Departments']
    try {
        const department ={
            name:req.body.name,
            location:req.body.location
        };
        const response = await mongodb.getDatabase().db().collection('departments').insertOne(department);
        if (response.acknowledged){
            res.status(201).json(response);
        }
        else
        {
            res.status(500).json(response.error || "An error occured while adding the department");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the department", error: error.message });
    }
};

const updateDepartment = async(req, res) => {
    //#swagger.tags=['Departments']
    try {
        const departmentId = new ObjectID(req.params.id);
        const department ={
            name:req.body.name,
            location:req.body.location
        };
        const response = await mongodb.getDatabase().db().collection('departments').updateOne({_id: departmentId}, {$set: department});
        if (response.modifiedCount > 0){
            res.status(200).json(response);
        }
        else
        {
            res.status(500).json(response.error || "An error occured while updating the department");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the department", error: error.message });
    }
};
const deleteDepartment = async(req, res) => {
    //#swagger.tags=['Departments']
    try {
        const departmentId = new ObjectID(req.params.id);
        const response = await mongodb.getDatabase().db().collection('departments').deleteOne({_id: departmentId});
        if (response.deletedCount > 0){
            res.status(200).json(response);
        }
        else
        {
            res.status(500).json(response.error || "An error occured while deleting the department");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the department", error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createDepartment,
    updateDepartment,
    deleteDepartment
};