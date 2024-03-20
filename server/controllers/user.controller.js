const { prisma } = require('../prisma/prisma-client')
const jwt = require('jsonwebtoken')
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

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})
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
		const responseUserData = {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			token: token,
		}

		res.status(200).json({
			success: true,
			data: responseUserData,
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
	try {
		const { name, email, password } = req.body

		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Please provide name, email and password',
			})
		}

		const candidate = await prisma.user.findUnique({
			where: {
				email,
			},
		})
		if (candidate) {
			return res.status(400).json({
				success: false,
				message: 'User already exists',
			})
		}

		const hashedPassword = await bcrypt.hash(password, 7)
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		})

		const token = jwt.sign({ id: newUser }, process.env.JWT_SECRET)
		const responseUserData = {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt,
			token: token,
		}
		res.send({
			success: true,
			data: responseUserData,
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
 * @route GET /api/user/current
 * @desc Get current user
 * @access Private
 */
const getCurrentUser = async (req, res) => {
	return res.status(200).json({
		success: true,
		data: req.user,
	})
}

module.exports = {
	loginUser,
	registerUser,
	getCurrentUser,
}
