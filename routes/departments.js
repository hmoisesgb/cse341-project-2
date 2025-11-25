const express = require('express');
const router = express.Router();

const departmentsController = require('../controllers/departments');
const { isAuthenticated } = require('../middleware/authenticate');
const validateDepartment = require('../middleware/validateDepartments');

router.get('/', departmentsController.getAll);
router.get('/:id', departmentsController.getSingle);
router.post('/', isAuthenticated, validateDepartment, departmentsController.createDepartment);
router.put('/:id', isAuthenticated, validateDepartment, departmentsController.updateDepartment);
router.delete('/:id', isAuthenticated, departmentsController.deleteDepartment);

module.exports= router;