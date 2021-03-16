const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./routes/steam.js')

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

app.get('/', (req, res) => res.status(200).json({ message: "Hello World!" }))
app.use('/steam', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`Your listenning on ${PORT} port.`) })