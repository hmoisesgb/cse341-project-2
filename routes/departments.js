const express = require('express');
const router = express.Router();

const departmentsController = require('../controllers/departments');
const validateDepartment = require('../middleware/validateDepartments');

router.get('/', departmentsController.getAll);
router.get('/:id', departmentsController.getSingle);
router.post('/', validateDepartment, departmentsController.createDepartment);
router.put('/:id', validateDepartment, departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

module.exports= router;