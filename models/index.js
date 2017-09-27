const Sequelize = require('sequelize')
const db = new Sequelize('postgress://localhost:5432/catClub', {logging:false});
//in the CLI, type "createdb catClub" to make database

//first arg is model name, second arg is schema definition
//third arg is getters and setters instance and class methods hooks

const Cat = db.define('cat', {
  name: {
  	type: Sequelize.STRING, 
  	allowNull: false
  }, 
  age: {
  	type: Sequelize.INTEGER, //age in months, getter method
    defaultValue: 12
  }, 
  breed: {
  	type: Sequelize.ENUM('domestic short hair', 'domestic long hair', 'bengal' ), 
  }, 
  color: {
  	type: Sequelize.STRING, 
  	allowNull: true
  }, 
  hasShots:{
  	type: Sequelize.BOOLEAN, 
  	defaultValue: false
  },
  description: {
  	type: Sequelize.TEXT, 
  	allowNull: true
  }
}, {
	getterMethods: { //virtual property
      ageInYears: function(){
      	return Math.round(this.age/12)
      }
	}, 
	hooks: {
	  beforeCreate: function(cat){
	  	if (!cat.hasShots){
	  		cat.name = cat.name + 'NEEDS SHOTS!'
	  	}
	  }
	}
})


const User = db.define('user', {
  name: {
  	type:Sequelize.STRING, 
  	allowNull: false, 
  	unique: true
  }, 
  email: {
  	type: Sequelize.STRING,
  	validate:: {
  		isEmail: true
  	}
  }
})

User.belongsTo(Cat, {as: 'favorite'})
//puts a favoriteId in the User table, foreign key to Cat

module.exports = { db, Cat, User }  //destructuring