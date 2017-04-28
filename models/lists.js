var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var ListSchema = new mongoose.Schema({

        facebookId:String,
          friendName:String,
          relationship:String,
          birthday:{
            month:String,
            day:String
          },
          age:Number,
          gender:String,
        amazon_results:String
});

var List= module.exports = mongoose.model('List', ListSchema);
