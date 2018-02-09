const router = require('express').Router();
const { Cat, User } = require('../models')

module.exports = router  

//see all users

router.get('/', (req, res, next) =>   {
  User.findAll({})
  .then((users) => {
  	res.json(users)
  })
  .catch(next);
})
// see some stuff about a user's favorite cat

router.get('/user/:userId/fave-cat', async (req, res, next) => {
  let user = await User.findById(req.params.userId).catch((err) => { console.log(err) })
  let cat = await Cat.findById(user.FavoriteId).catch((err) => {console.log(err)})

  res.send( user.name + " really loves " + cat.name );
})

//update a user

router.put('/user/:userId', (req, res, next) => {
   User.findById(req.params.userId)
   .then((user) => {
   	  return user.update(req.body)
   })
   .then((updatedUser) => {
     res.json(updatedUser)
   })
   .catch(next);
})

//create a user

router.post('/new-user', (req, res, next) => {
	User.create(req.body)
	.then((newUser) => {
		res.json(newUser)
	})
	.catch(next);
})

//delete a user

router.delete('/user/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then((user) => {
  	return user.destroy();
  })
  .then((deletedUser) => {
  	res.json(deletedUser)
  })
  .catch(next);
})
