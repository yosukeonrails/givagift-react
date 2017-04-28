var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({

        username:String,
       facebookId:String,
       token:String,
       email:String

});

var User= module.exports = mongoose.model('User', UserSchema);
