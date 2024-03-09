const loginUser = async (req, res) => {
	res.status(200).json({
		success: true,
		data: 'Login User',
	})
}

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
