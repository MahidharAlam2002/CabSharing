const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session');

const app = express();

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
  res.redirect('http://localhost:3000/home');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/home',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // console.log('app.get /auth/google/home passport.authenticate');
    res.redirect('http://localhost:3000/home');
  }
);

app.post("/auth/google/home", function(req, res){
  // console.log("app.post('/auth/google/home')")
  res.redirect('http://localhost:8080/auth/google/home');
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});