const mongoose = require('mongoose') ; 
const FoodSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.String,
        ref :'User'
    },
    pseudo:{
        type:String
    }
    ,description : {
        type : String,
    },
    picture : {
        type : String ,
        required : true
    },
    createdAt : {
        type : Date , 
        default : Date.now
    },
    likes: [
		{
			user: {
				type:  mongoose.Schema.Types.String,
				ref: 'users',
				required: true
			},
			pseudo: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now()
			}
		}
	],
	comments: [
		{
			user: {
				type:  mongoose.Schema.Types.String,
				ref: 'users',
				required: true
			},
			text: {
				type: String,
				required: true
			},
			pseudo: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now()
			}
		}
	]
})

/* 
,
    user:{
        type : mongoose.Schema.Types.String,
        ref :'User'
    }
*/


module.exports = Food = mongoose.model('food' , FoodSchema) ; 