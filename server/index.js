const express = require('express')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.route')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) => {
	res.send('Hello, world!')
})

app.use('/api/user', userRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`)
})
