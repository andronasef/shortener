// install express with `npm install express` 
const express = require('express')
const shortsDB = require('./db')
const shortsRouter = require('./routes/shorts')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(shortsRouter)

app.listen(port, () => console.log(`Go to  http://localhost:${port}/`))
// export 'app'
module.exports = app