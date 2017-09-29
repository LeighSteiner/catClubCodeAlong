'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path') //don't need to npm install

const catRoutes = require('./routes/cat');
const userRoutes = require('./routes/user')
const db = require('./models').db

const app = express();
module.exports = app;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'./public')))  //not needed for this example, its for serving html files
app.use(morgan('dev'))

app.use('/cats', catRoutes)
app.use('/users', userRoutes)

//error handling -- must go after routes, so that the "catch" will catch route errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message);
  //send status and send work like return statements IN THAT THEY STOP THE EXECUTION
})

//set up server at the end -- we want the middleware going before the server starts listening
db.sync()
.then(() => {
  console.log('our kitten database has successfully synced')
  app.listen(3000, () => {
   console.log('Server is listening for meows at port 3000...')
  })
})
.catch(() => {
	console.log('some hinky shit went down when we tried to sync the database')
})






