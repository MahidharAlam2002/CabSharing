const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

const app = express();

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "Our little secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const pool = mysql.createPool({
  host: 'cabsharing.mysql.database.azure.com',
  user: 'RITHVIK',
  password: 'Kondapalkala@%2002',
  database: 'cabsharingdb',
  port: 3306,
  ssl:true
});

// serialize and deserialize user information
passport.serializeUser((user, done) => {
  // console.log("serializeUser");
  done(null, user.google_id);
});

passport.deserializeUser((id, done) => {
  // console.log("deserializeUser");
  pool.query('SELECT * FROM users WHERE google_id = ?', [id], (err, rows) => {
    done(err, rows[0]);
  });
});

passport.use(new GoogleStrategy({
  clientID:'227071007756-rivh29c65qeg6n2ai2ov5rbda764ouec.apps.googleusercontent.com',
  clientSecret:'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',
  callbackURL: "http://localhost:8080/auth/google/home",
  scope: ['profile', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails ,photos} = profile;
  // console.log(profile);
  // check if the user already exists in the database
  // console.log("googlestrategy");
  pool.query('SELECT * FROM users WHERE google_id = ?', [id], (err, rows) => {
    if (err) return done(err);
    if (rows.length) return done(null, rows[0]);
    // create a new user in the database
    const newUser = {
      google_id: id,
      name: displayName,
      email: emails[0].value,
      photo:photos[0].value
    };
    // console.log("newUserss",newUser);

    pool.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) done(err);
      newUser.id = res.insertId;
      // console.log("res",res);
      // console.log("newUser",newUser);
      return done(null, newUser);

      // req.login(newUser, (err) => {
      //   if (err) throw err;
      //   res.redirect('/');
      // });
    });
  });
}));



app.get('/', (req, res) => {
  // console.log('app.get /');
  res.redirect("http://localhost:3000/");
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // console.log('app.get /profile');
    res.redirect('http://localhost:3000/profile');
  } else {
    // console.log('app.get /profile');
    res.redirect('http://localhost:3000');
  }
});

app.get('/home', (req, res) => {
  // console.log('app.get /home');
  console.log('from nodejs 96 :'+req.user);
  res.redirect('http://localhost:3000/home');
});

app.get('/user', (req, res) => {
  // console.log('app.get /home');
  console.log('from nodejs 105 :'+JSON.stringify(req.user));
  // console.log('res from 114, 115 :');
  // console.log(res);
  res.redirect('http://localhost:3000/home');
});

// app.get('/userData', (req, res) => {
//   // console.log('app.get /home');
//   console.log('from nodejs 121 :'+JSON.stringify(req.user));
//   res.send(JSON.stringify(req.user));
// });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/home',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res){
    // console.log('app.get /auth/google/home passport.authenticate');
    console.log('req.user 132 :'+JSON.stringify(req.user));
    res.redirect('http://localhost:3000/home');
  }
);

// app.post("/auth/google/home", function(req, res){
//   // console.log("app.post('/auth/google/home')")
//   console.log('req.user 117 :'+req.user);
//   res.redirect('http://localhost:8080/auth/google/home');
// });

app.listen(8080, () => {
  console.log('Server started on port 8080');
});