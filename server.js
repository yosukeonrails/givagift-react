
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config= require('./config');
var passport= require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User= require('./models/facebookuser.js');
var app = express();
var List= require('./models/lists.js');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.createConnection('mongodb://localhost/');
//
// mongoose.connection.on('error', function(err) {
//     console.error('Could not connect.  Error:', err);
// });



// app.use(express.static('build'));

var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(bodyParser.json());
app.use(express.static('build'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


passport.serializeUser(function(user, done) {
      console.log(user);
    done(null, user._id);

});

// used to deserialize the user
passport.deserializeUser(function(id, done) {

    User.findById(id, function(err, user) {
            console.log(user);
        done(err, user);
    });

});


app.get('/amazonlist/:id', function(req, res){

  List.find({ facebookId:req.params.id}, function(err, data){

    if(err){

    }

    res.json(data);
});

});


app.post('/amazonlist' , function(req, res){

    var listData= {
        facebookId:req.body.facebookId,
        friendName:req.body.name,
        relationship:req.body.relationship,
        birthday:{
          month:req.body.month,
          day:req.body.day
        },
        age:req.body.age,
        gender:req.body.gender,
      amazon_results:req.body.amazon_results
    };

  List.findOneAndUpdate({ facebookId:req.body.facebookId , friendName:req.body.name}, {$set:listData},{upsert:true, new:true}, function(err, data){

      if(err){
        console.log(err);
      }

      res.json(data);
  });

});

app.get('/mockuser/:id', function(req, res){

  User.find({ facebookId:req.params.id}, function(err, data){

    if(err){

    }


    res.json(data);
});

});

app.post('/mockuser', function(req, res){

  let mockData= {
    username:req.body.username,
    facebookId:req.body.facebookId,
    token:req.body.token,
    email:req.body.email
  };
      User.findOneAndUpdate({facebookId:req.body.facebookId}, {$set:mockData},{upsert:true, new:true}, function(err, data){

          if(err){
          }

          res.json(data);
      });
});



  passport.use(new FacebookStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.URL+'auth/facebook/callback'
    // profileFields: ['id', 'displayName','birthday', 'picture', 'email']
  }, function(accessToken, refreshToken, profile, done) {

    console.log('here is picture data');
    console.log(profile._json.picture);
    console.log('end');

    let userData= {
      username:profile.displayName,
      facebookId:profile.id,
      token:profile.accessToken,
      email:profile.email
    };


    User.findOneAndUpdate({ facebookId: profile.id },{$set:userData}, { upsert: true, new: true } , function (err, user) {

          return done(err, user);

        });

   }));


      app.use(passport.initialize());
      app.use(passport.session());


   app.get('/auth/facebook',
     passport.authenticate('facebook'));


   app.get('/auth/facebook/callback',
     passport.authenticate('facebook', { failureRedirect: '/' }),
     function(req, res) {
       // Successful authentication, redirect home.
       console.log('sucessful login');
          res.redirect('/#/dashboard');
     });


    app.get('/user', function(req, res){

            console.log('/user at enpoint fetch');
            console.log(req.user);
         res.json(req.user);

    });




var amazon = require('amazon-product-api');


var client = amazon.createClient({
  awsId: "AKIAIFAXTMOZPQMH7NKA",
  awsSecret: "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",
  awsTag: "yosuke-assignment-20"
});


app.get('/amazon/:index', function(req, res){
          console.log(req.params.index);
  client.itemSearch({
   keywords: req.params.index,
   searchIndex: 'All',
   responseGroup: 'ItemAttributes,Offers,Images'
}, function(err, data){

      console.log(data);
       res.json(data);
 });
});



app.get('/', function(req, res) {

    console.log('using the path');

});



var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }
        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};


if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}
