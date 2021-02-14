var express = require('express');
var router = express.Router();
var ctrlEmployees = require('./employee.controller')

/** GET Employees */
router.get('/employees', ctrlEmployees.employeeReadAll)
router.get('/employees/:employeeid', ctrlEmployees.employeeReadOne)

/** Create Employee */
router.post('/employees', ctrlEmployees.employeeCreate)

/** Update Employee */
router.put('/employees/:employeeid', ctrlEmployees.employeeUpdateOne)

/** Delete Employee */
router.delete('/employees/:employeeid', ctrlEmployees.employeeDeleteOne)

module.exports = router;