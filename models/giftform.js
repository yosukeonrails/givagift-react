var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var GiftFormSchema = new mongoose.Schema({

  facebookId:String,
  friendName:String,
  relationship:String,

  // birthday:{
  //   month:String,
  //   day:String
  // },
  //
  // age:Number,
  //
  // gender:String,
  //
  // amazon_results:String,

  traits:[
    {
        trait:{
          type: Object
        }
    }

  ]

});

var GiftForm= module.exports = mongoose.model('GiftForm', GiftFormSchema);
