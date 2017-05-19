var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var GiftFormSchema = new mongoose.Schema({
    //req parameters

  facebookId:String,
  id:String,
// $set parameters
  bdMonth:Number,
  bdDay:Number,
  friendName:String,
  gender:String,
  relationship:String,
  age:Number,
  date:Number,
  month:Number,
  StartTime:String,
  EndTime:String,
  lastPage:String,
  //$push parameter
  traits:[
    {
        trait:{
          type: Object
        }
    }
  ]

});

var GiftForm= module.exports = mongoose.model('GiftForm', GiftFormSchema);
