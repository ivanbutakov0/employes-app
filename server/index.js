const express = require('express')
const userRouter = require('./routes/user.route')
const employeesRouter = require('./routes/employees.route')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
	cors({
		origin: 'http://localhost:5173',
		allowedHeaders: ['Content-Type'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
)

app.get('/', (req, res) => {
	res.send('Hello, world!')
})

app.use('/api/user', userRouter)
app.use('/api/employee', employeesRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`)
})
