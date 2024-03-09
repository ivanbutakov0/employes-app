const { prisma } = require('../prisma/prisma-client.js')

/**
 * @route GET /api/employee
 * @desc Get all employees
 * @access Private
 */
const getAllEmployees = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany()
		res.status(200).json({
			success: true,
			data: employees,
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong',
			error: err.message,
		})
	}
}
/**
 * @route GET /api/employee/:id
 * @desc Get employee by id
 * @access Private
 */
const getEmployeeById = async (req, res) => {
	try {
		const { id } = req.params
		const employee = await prisma.employee.findUnique({
			where: {
				id,
			},
		})
		if (!employee) {
			return res
				.status(404)
				.json({ success: false, message: 'Employee not found' })
		}
		res.status(200).json({
			success: true,
			data: employee,
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong',
			error: err.message,
		})
	}
}

/**
 * @route POST /api/employee/create
 * @desc Create employee
 * @access Private
 */
const createEmployee = async (req, res) => {
	try {
		const { firstName, lastName, age, address } = req.body

		if (!firstName || !lastName || !age || !address) {
			return res.status(400).json({
				success: false,
				message: 'Please provide firstName, lastName, age and address',
			})
		}

		const newEmployee = await prisma.employee.create({
			data: {
				firstName,
				lastName,
				age,
				address,
				userId: req.userId,
			},
		})

		res.status(200).json({
			success: true,
			data: newEmployee,
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong',
			error: err.message,
		})
	}
}

const deleteEmployee = async (req, res) => {}

const editEmployee = async (req, res) => {}

module.exports = {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	deleteEmployee,
	editEmployee,
}
