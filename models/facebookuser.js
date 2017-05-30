
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var FacebookUserSchema = new mongoose.Schema({

        email:{
        type: String,
        required: true,
        unique: true
        },
        username:{
        type: String,
        required: true,
        unique: true
    },
        first_name:{
        type: String,
        required: true,
        unique: true
        },
        facebookId:String,
        token:String,
        email:String,

        password: {
      type: String,
      required: true
  }

});




var FacebookUser= module.exports = mongoose.model('FacebookUser', FacebookUserSchema);
