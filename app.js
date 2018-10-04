const express = require('express')
const app = express()
const routes = require('./routes')
const bodyParser = [ express.urlencoded({ extended: true }), express.json() ]
const PORT = process.env.EXPRESS_PORT || 3000

app.use('/', bodyParser, routes)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = app