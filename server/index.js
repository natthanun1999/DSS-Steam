const express       = require('express')
const mongoose      = require('mongoose')
const cors          = require('cors')
const bodyParser    = require('body-parser')
const dotenv        = require('dotenv')

const routes = require('./routes/steam.js')

dotenv.config()

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

app.get('/', (req, res) => res.status(200).json({ message: "Hello World!" }))
app.use('/beta/steam', routes)

mongoose.connect(process.env.MONGO_CON, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch((e) => console.error(e.message))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`Your listenning on ${PORT} port.`) })