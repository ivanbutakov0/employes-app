const express = require('express')
const {
	registerUser,
	currentUser,
	loginUser,
} = require('../controllers/user.controller')

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/current', currentUser)

module.exports = router
