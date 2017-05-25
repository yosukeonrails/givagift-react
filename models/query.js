    var mongoose = require('mongoose');
    var bcrypt = require('bcryptjs');

    var QuerySchema = new mongoose.Schema({
            //req parameters
            id:String,
            // $set parameters
            gender:String,
            name:String,
            relationship:String,
            StartTime:String,
            holiday:Object,
            //$push parameter
            traits:Object
    });

    var Query= module.exports = mongoose.model('Query', QuerySchema);
