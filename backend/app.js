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
const profileRoutes=require('./profile')
const searchRoutes=require('./search')
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
app.get('/api/authenticate',(req,res)=>{
  res.send(req.user);
})
app.get('/logout',(req,res)=>{
  req.logout((err)=>{
    res.redirect('http://localhost:3000/');
  })
})
// app.post("/auth/google/home", function(req, res){
//   // console.log("app.post('/auth/google/home')")
//   console.log('req.user 117 :'+req.user);
//   res.redirect('http://localhost:8080/auth/google/home');
// });
app.get('/search', (req, res) => {
  // handle GET request for /users endpoint

  //working start
  console.log("search",req.query)
//   const startPlace = req.query.startPlace|| null;
  
//   const endPlace = req.query.endPlace || null;
//   const searchDate = req.query.date || null;
//   const searchTime =  req.query.time || null;
//   console.log(searchDate);
  
//   let datePlaceholder = searchDate ? '?' : 'CURDATE()';
  
//   const sqlQuery = `
//   SELECT schedule_id,start_place,end_place,date,time
//   FROM schedules
//   WHERE (${startPlace ? 'start_place IN (?)' : 'TRUE'} )
//   AND (${endPlace ? 'end_place IN (?)' : 'TRUE'})
//   ORDER BY 
//     CASE 
//       WHEN date IS NULL AND time IS NULL THEN 1
//       WHEN date IS NULL THEN ABS(TIMEDIFF(time, ?))
//       WHEN time IS NULL THEN ABS(DATEDIFF(CURDATE(), '${datePlaceholder}'))
//       ELSE  ABS(DATEDIFF('${datePlaceholder}', date)) + ABS(TIMEDIFF(time, ?))
//     END ASC
// `;
  
//   let queryParams = [startPlace, endPlace, searchTime, searchTime];
  
//   if (searchDate) {
//     queryParams.splice(1, 0, searchDate);
//     queryParams.splice(3, 0, searchDate);
//   }
  
//   pool.query(sqlQuery, queryParams, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.send(err)
//       return;
//     }
//     console.log(results);
//     res.send(results);
//   });

//working end

const startPlace = req.query.startPlace || null;
const endPlace = req.query.endPlace || null;
const searchDate = req.query.date || null;
const searchTime = req.query.time || null;
console.log(searchDate);

let datePlaceholder = searchDate ? '?' : 'CURDATE()';

// const sqlQuery = `
//   SELECT schedules.schedule_id, schedules.start_place, schedules.end_place, schedules.date, schedules.time, IF(merge.schedule_id IS NOT NULL, 'Unjoin', 'Join') AS status
//   FROM schedules
//   LEFT JOIN merge ON schedules.schedule_id = merge.schedule_id AND merge.google_id = ?
//   WHERE (${startPlace ? 'start_place IN (?)' : 'TRUE'})
//   AND (${endPlace ? 'end_place IN (?)' : 'TRUE'})
//   ORDER BY 
//     CASE 
//       WHEN date IS NULL AND time IS NULL THEN 1
//       WHEN date IS NULL THEN ABS(TIMEDIFF(time, ?))
//       WHEN time IS NULL THEN ABS(DATEDIFF(CURDATE(), '${datePlaceholder}'))
//       ELSE  ABS(DATEDIFF('${datePlaceholder}', date)) + ABS(TIMEDIFF(time, ?))
//     END ASC
// `;
const sqlQuery=`
SELECT schedules.schedule_id, schedules.start_place, schedules.end_place, schedules.date, schedules.time, IF(merge.schedule_id IS NOT NULL, 'Unjoin', 'Join') AS status,
JSON_ARRAYAGG(
  CASE 
    WHEN users.name IS NOT NULL THEN 
      JSON_OBJECT(
        'name', users.name,
        'phone_number', users.phone
      )
    ELSE 
       JSON_ARRAY()
  END
) AS listofpassengers
FROM schedules
LEFT JOIN merge ON schedules.schedule_id = merge.schedule_id AND merge.google_id = ?
LEFT JOIN merge as m2 ON schedules.schedule_id = m2.schedule_id
LEFT JOIN users ON m2.google_id = users.google_id
WHERE (${startPlace ? 'start_place IN (?)' : 'TRUE'})
AND (${endPlace ? 'end_place IN (?)' : 'TRUE'})
GROUP BY schedules.schedule_id
ORDER BY 
  CASE 
    WHEN date IS NULL AND time IS NULL THEN 1
    WHEN date IS NULL THEN ABS(TIMEDIFF(time, ?))
    WHEN time IS NULL THEN ABS(DATEDIFF(CURDATE(), '${datePlaceholder}'))
    ELSE  ABS(DATEDIFF('${datePlaceholder}', date)) + ABS(TIMEDIFF(time, ?))
  END ASC
`
// console.log(req.user)
let queryParams = [req.user.google_id, startPlace, endPlace, searchTime, searchTime];

if (searchDate) {
  queryParams.splice(2, 0, searchDate);
  queryParams.splice(4, 0, searchDate);
}

pool.query(sqlQuery, queryParams, (err, results) => {
  if (err) {
    console.error(err);
    res.send(err)
    return;
  }
  console.log(results);
  res.send(results);
});


  //old
  // pool.query(
  //   'SELECT * FROM schedules WHERE (start_place IN (?) OR start_place IS NULL) AND (end_place IN (?)  OR end_place IS NULL) ORDER BY CASE  WHEN date IS NULL AND time IS NULL THEN 1 WHEN date IS NULL THEN ABS(TIMEDIFF(time, ?)) WHEN time IS NULL THEN ABS(DATEDIFF(date, ?)) ELSE  ABS(DATEDIFF(date, ?)) + ABS(TIMEDIFF(time,?)) END ASC;',
  //   [req.query.startPlace, req.query.endPlace, req.query.date, req.query.time, req.query.date, req.query.time],
  //   (error, results, fields) => {
  //     if (error) {
  //       console.error(error);
  //       // Handle the error appropriately
  //     } else {
  //       console.log(results,fields);
  //       // Do something with the results
  //     }
  //   }
  // ); 

  
  // res.send(req.status);
});

app.get('/mybooking',(req,res)=>{
  const sqlQuery = `
  SELECT s.schedule_id,s.start_place,s.end_place,s.date,s.time
  FROM schedules as s inner join merge as m on m.schedule_id=s.schedule_id and m.google_id=?`;
  queryParams=[req.user.google_id];
  pool.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      res.send(err)
      return;
    }
    console.log(results);
    res.send(results);
  });
})
app.get('/join',(req,res)=>{
  const sqlQuery=`insert into merge values(?,?)
  `
  queryParams=[req.user.google_id,req.query.schedule_id];
  pool.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      res.send(err)
      return;
    }
    console.log(results);
    res.send(results);
  });
})
app.get('/unjoin',(req,res)=>{
  const sqlQuery=`delete from merge where google_id=? and schedule_id =?`
  queryParams=[req.user.google_id,req.query.schedule_id];
  pool.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      res.send(err)
      return;
    }
    console.log(results);
    res.send(results);
  });

})
app.get('/createschedule',(req,res)=>{
  const sqlQuery1=`insert into schedules values(?,?,?,?,?)`;
  const sqlQuery2=`insert into merge values(?,?)`;
  console.log('create',req.query);
  scheduleid=req.user.google_id;
  scheduleid+='_';
  scheduleid+=req.query.date;
  scheduleid+=req.query.time;
  const myDate = new Date(req.query.date);
  const myDateTime = myDate.toISOString().slice(0, 19).replace('T', ' ');

  queryParams1=[scheduleid,req.query.startPlace,req.query.endPlace,myDateTime ,req.query.time];
  queryParams2=[req.user.google_id,scheduleid];
  pool.query(sqlQuery1, queryParams1, (err, results) => {
    if (err) {
      console.error(err);
      res.send(err)
      return;
    }
    console.log(results);
    // res.send(results);
  });
  
})
app.get('/createschedule2',(req,res)=>{
  const sqlQuery2=`insert into merge values(?,?)`;
  scheduleid=req.user.google_id;
  scheduleid+='_';
  scheduleid+=req.query.date;
  scheduleid+=req.query.time;
  queryParams2=[req.user.google_id,scheduleid];
  pool.query(sqlQuery2, queryParams2, (err, results) => {
    if (err) {
      console.error(err);
      res.send(err)
      return;
    }
    console.log(results);
    res.send(results);
  });
})
module.exports = pool;
app.use(profileRoutes)
app.use(searchRoutes)
app.listen(8080, () => {
  console.log('Server started on port 8080');
});