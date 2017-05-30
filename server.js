
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config= require('./config');
var passport= require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookUser= require('./models/facebookuser.js');
var app = express();
var List= require('./models/lists.js');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var GiftForm =  require('./models/giftform.js');
var Query= require('./models/query.js');
var User= require('./models/user.js');

mongoose.Promise = global.Promise;

//
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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
      console.log(user);
    done(null, user._id);

});

// used to deserialize the user
passport.deserializeUser(function(id, done) {

    FacebookUser.findById(id, function(err, user) {
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

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
  console.log('user is logged out');
});


// gind a GiftForm by Id //

app.get('/giftform/:id/:facebookId', function(req, res){

      var query={
        facebookId:req.params.facebookId,
        id:req.params.id
      }

      console.log(query);

     GiftForm.find( query, function(err, data){

          if(err){
              console.log(err);
          }

            console.log('found this');
          res.json(data);

     })



})


// Add a Gift Form or Update

app.post('/giftform', function(req, res){


var trait= req.body.trait

var query= {
  facebookId:req.body.facebookId,
  id:req.body.id
}



  var giftFormData= {

    $set:{
      bdMonth:req.body.bdMonth,
      bdDay:req.body.bdDay,
      friendName:req.body.friendName,
      gender:req.body.gender,
      relationship:req.body.relationship,
      age:req.body.age,
      date:req.body.date,
      month:req.body.month,
      StartTime:req.body.StartTime,
      EndTime:req.body.EndTime,
      lastPage:req.body.lastPage,
      traits:req.body.traits,
      finished:req.body.finished,
      lastOpened:req.body.lastOpened,
      personality:req.body.personality
    }

      // $push:{
      //   traits: {
      //     trait: trait,
      //   }
      //
      // }
  };

     GiftForm.findOneAndUpdate( query , giftFormData ,  {
       upsert:true,
       new:true
     }, function(err, data){
          console.log(err);
          console.log('here is the data')
          console.log(data)
          res.status(201).json(data);

     });

});

// delete one gift form

 app.delete('/deletegiftform/:id' ,  function(req, res){

   var query={
     id:req.params.id
   }

   GiftForm.remove( query, function(err, data){

        if(err){
            console.log(err);
        }

        res.json(data);

      })
 })

// get gift Form

app.get('/lastgiftform/:id', function(req, res){

  var query= {
      facebookId:req.params.id,
      lastOpened:true
  }

  GiftForm.find( query, function(err, data){

    if(err){

    }

    res.json(data);
  });


})


// delete Traits

app.post('/deletetraits', function(req, res){


  var query= {
    facebookId:req.body.facebookId,
    id:req.body.id
  }

  var update={
    $set:{
          traits:[]
    }

  }

  GiftForm.findOneAndUpdate( query , update ,  {
    upsert:true,
    new:true
  }, function(err, data){
       console.log(err);
       res.status(201).json(data);
  });


});


//delete group form

app.delete('/giftform', function(req, res) {


    var trait= req.body.trait

    var query= {
      facebookId:req.body.facebookId,
      id:req.body.id
    }

    var update = {
        $pull: {  traits: { _id:req.body.traitId } }
    };

  GiftForm.findOneAndUpdate(query, update, function(err, data) {
        console.log('error is ');
        console.log(err);

        res.status(201).json(data);
        console.log('it worked?');
    });

});



/// Query Post //

app.post('/query', function(req, res){

      var query={
        id:req.body.id
      }


      var update= {



        $set:{

        name:req.body.name,
        StartTime:req.body.StartTime,
        holiday:req.body.holiday,
        //$push parameter
        queries:req.body.queries,

        }

      }


      Query.findOneAndUpdate( query , update ,  {
        upsert:true,
        new:true
      }, function(err, data){
           console.log(err);
           res.status(201).json(data);
      });

})



app.get('/query' , function(req, res){


    Query.find({}, function(err, data){

      if(err){

      }


      res.json(data);
  });


})



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

  FacebookUser.find({ facebookId:req.params.id}, function(err, data){

    if(err){

    }


    res.json(data);
});

});



/* user sign up start*////// LOCAL STRATEGY


app.post('/users', function(req, res) {

    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

          /* handle password*/


    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    var newUser = new User({
        username: username,
        password: password,
    });

    User.createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log(user);
        console.log('user was CREATED!');
        res.json(user);
    });

});

/* user sign up end */




/*login in user start*/

passport.use(new LocalStrategy(

    function(username, password, done) {

        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                console.log('Unkwown User');
                return done(null, false, {
                    message: 'Unknown User'
                });

            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {

                    console.log('You are Loggeeeeed in');

                    return done(null, user);


                } else {
                    console.log('Invalid Password');
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });
    }));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


function isLoggedIn(req, res, next) {
    /* For production */
    if (req.isAuthenticated()) {
        return next();
    }
    /* For testing, inject a user manually */
    if (process.env.NODE_ENV == 'test') {

        req.user = {

            '_id': '1',
            'username': 'test',
            'password': 'test'
        };
        return next();
    }

    res.sendStatus(403);
}




app.post('/login',

    passport.authenticate('local'),

    function(req, res) {

        res.json(req.user);

    });


app.get('/hidden', function(req, res) {

    console.log('using the path');

});


/*login in user end*/




app.post('/mockuser', function(req, res){

  let mockData= {
          username:req.body.username,
          facebookId:req.body.facebookId,
          token:req.body.token,
          email:req.body.email
  };
      FacebookUser.findOneAndUpdate({facebookId:req.body.facebookId}, {$set:mockData},{upsert:true, new:true}, function(err, data){

          if(err){
          }

          res.json(data);
      });
});


  passport.use(new FacebookStrategy({

    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.URL+'auth/facebook/callback',
    profileFields: ['id', 'displayName','birthday', 'picture', 'email' , 'first_name']
  }, function(accessToken, refreshToken, profile, done) {


    let userData= {
      first_Name:profile._json.first_name,
      username:profile.displayName,
      facebookId:profile.id,
      // token:profile.accessToken,
      // email:profile.email
    };


    FacebookUser.findOneAndUpdate({ facebookId: profile.id },{$set:userData}, { upsert: true, new: true } , function (err, user) {

          return done(err, user);

        });

   }));





   app.get('/auth/facebook',
     passport.authenticate('facebook'));


   app.get('/auth/facebook/callback',
     passport.authenticate('facebook', { failureRedirect: '/' }),
     function(req, res) {
       // Successful authentication, redirect home.
       console.log('sucessful login');

          res.redirect('/#/');
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
