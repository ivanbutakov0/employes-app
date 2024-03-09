const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	removeEmployee,
	editEmployee,
} = require('../controllers/employee.controller')

const router = express.Router()

router.get('/', verifyToken, getAllEmployees)
router.get('/:id', verifyToken, getEmployeeById)
router.post('/create', verifyToken, createEmployee)
router.delete('/remove/:id', verifyToken, removeEmployee)
router.put('/edit/:id', verifyToken, editEmployee)

module.exports = router
