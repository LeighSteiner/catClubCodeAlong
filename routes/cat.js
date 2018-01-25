const router = require('express').Router();
const { Cat, User } = require('../models')

module.exports = router  

//we might or might not code out all the routes depending on time
//but can direct folks to github repo
//get all the cats

router.get('/', (req, res, next) => {
	Cat.findAll({})
	.then((cats) => {
		res.status(200).json(cats);
	})
	.catch(next);
})

//look at one cat

router.get('/cat/:catId', (req, res, next) => {
	Cat.findById(req.params.catId)
	.then((cat) => {
		res.json(cat)
	})
	.catch(next);

})

//make a new cat

router.post('/new-cat', (req, res, next) => {
   Cat.create(req.body)
   .then((cat) => {
   	  res.status(201).json(cat)
   })
   .catch(next);
})

//update an existing cat

router.put('/cat/:catId', (req, res, next) => {
   let id = req.params.catId;
   Cat.findById(id)
   .then((cat) => {
   	 return cat.update(req.body)
   	 //what's the difference between cat and Cat here?
   	 //why do we want to RETURN the update?

       //answers: Cat is the model in our database -- we're searching that table for the right cat
       // cat is the specific cat we've found (we could name it anything)
       // we want to return the update because it's a promise, and we want that value to be passed down the promise chain
   })
   .then((updatedCat) => {
   	  res.json(updatedCat);
   })
   .catch(next)
})

//notes: use Postman to test when you're not sure
//remember that DBs are 1-indexed, not 0-indexed
// status info: https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html






