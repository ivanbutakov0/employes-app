const { prisma } = require('../prisma/prisma-client.js')

/**
 * @route GET /api/employees
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
		res
			.status(500)
			.json({ success: false, message: 'Something went wrong', data: err })
	}
}

const getEmployeeById = async (req, res) => {}

const createEmployee = async (req, res) => {}

const deleteEmployee = async (req, res) => {}

const editEmployee = async (req, res) => {}

module.exports = {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	deleteEmployee,
	editEmployee,
}
