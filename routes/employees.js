const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
const validateEmployee = require('../middleware/validateEmployees');

router.get('/', employeesController.getAll);
router.get('/:id', employeesController.getSingle);
router.post('/', validateEmployee, employeesController.createEmployee);
router.put('/:id', validateEmployee, employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);

module.exports= router;