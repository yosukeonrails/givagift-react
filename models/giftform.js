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
  gender:Object,
  relationship:Object,
  age:Object,
  date:Number,
  month:Number,
  StartTime:String,
  EndTime:String,
  lastPage:String,
  finished:Boolean,
  lastOpened:Boolean,
  //$push parameter
  traits:Object

});

var GiftForm= module.exports = mongoose.model('GiftForm', GiftFormSchema);
