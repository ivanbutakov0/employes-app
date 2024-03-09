const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')

/**
 *	@route POST /api/user/login
 *	@desc Login User
 *	@access Public
 */

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Please provide email and password',
			})
		}

		const user = await prisma.user.findOne({ email })
		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User not found',
			})
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(400).json({
				success: false,
				message: 'Invalid password',
			})
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
		res.cookie('access_token', token, {
			httpOnly: true,
		})
		res.status(200).json({
			success: true,
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
 *	@route POST /api/user/register
 *	@desc Register User
 *	@access Public
 */
const registerUser = async (req, res) => {
	res.status(200).json({
		success: true,
		data: 'Register User',
	})
}

const currentUser = async (req, res) => {
	res.status(200).json({
		success: true,
		data: 'Current User',
	})
}

module.exports = {
	loginUser,
	registerUser,
	currentUser,
}
