const express = require('express')
const {
	registerUser,
	getCurrentUser,
	loginUser,
} = require('../controllers/user.controller')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/current', verifyToken, getCurrentUser)

module.exports = router
