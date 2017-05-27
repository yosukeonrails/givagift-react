    var mongoose = require('mongoose');
    var bcrypt = require('bcryptjs');

    var QuerySchema = new mongoose.Schema({
            //req parameters
            id:String,
            // $set parameters
            name:String,
            StartTime:String,
            holiday:Object,
            //$push parameter
            queries:Object,
  
    });

    var Query= module.exports = mongoose.model('Query', QuerySchema);
