const getUsers = async (req, res) => {
	res.status(200).json({
		success: true,
		data: 'Users',
	})
}

module.exports.getUsers = getUsers
