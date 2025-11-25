const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
const { isAuthenticated } = require('../middleware/authenticate');
const validateEmployee = require('../middleware/validateEmployees');

router.get('/', employeesController.getAll);
router.get('/:id', employeesController.getSingle);
router.post('/', isAuthenticated, validateEmployee, employeesController.createEmployee);
router.put('/:id', isAuthenticated, validateEmployee, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);

module.exports= router;