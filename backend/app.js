const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const moment = require('moment-timezone');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var session = require('express-session');
const { promisify } = require('util');
const crypto = require('crypto');
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
app.use(bodyParser.json());


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
const query = promisify(pool.query).bind(pool);
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
  // console.log('from nodejs 96 :'+req.user);
  res.redirect('http://localhost:3000/home');
});

app.get('/user', (req, res) => {
  // console.log('app.get /home');
  // console.log('from nodejs 105 :'+JSON.stringify(req.user));
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
    // console.log('req.user 132 :'+JSON.stringify(req.user));
    // console.log(req.user);
    if(req.user.google_id==='110671206414098862281' || req.user.google_id==='104607823624198558021' || req.user.google_id==='112766095813271316268' || req.user.google_id==='117191595535130300633'){
      res.redirect('http://localhost:3000/users');
    }
    else{
      res.redirect('http://localhost:3000/home');
    }
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
app.get('/search', async (req, res) => {
  // handle GET request for /users endpoint

  //working start
  // console.log("search",req.query)
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
// console.log(searchDate);

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
AND (${endPlace ? 'end_place IN (?)' : 'TRUE'}) AND schedules.time >CONVERT_TZ(NOW(), @@session.time_zone, '+05:30')
GROUP BY schedules.schedule_id 
ORDER BY 
  CASE 
    WHEN date IS NULL AND time IS NULL THEN 1
    WHEN date IS NULL THEN ABS(TIMEDIFF(time, null))
    WHEN time IS NULL THEN ABS(DATEDIFF(CURDATE(), ${searchDate ? '?' : 'CURDATE()'}))*86400
    ELSE  ABS(DATEDIFF(${searchDate ? '?' : 'CURDATE()'}, date))*86400 +ABS(TIMESTAMPDIFF(SECOND,TIME(${searchTime ? '?' : 'CURTIME()'}),TIME(time)))
  END ASC
`
// console.log(req.user)
let queryParams = [req.user.google_id];
let t=1;
if(startPlace)
{
  queryParams.splice(t, 0,startPlace);
  t=t+1;
}
if(endPlace)
{
  queryParams.splice(t,0,endPlace);
  t=t+1;
}
if (searchDate) {
  const sqlDate = new Date(searchDate);
  queryParams.splice(t, 0,sqlDate);
  t=t+1;
  queryParams.splice(t, 0,sqlDate);
  t=t+1;
}
if(searchTime)
{
  const sqlTime = moment(searchTime, 'HH:mm');
  const sqlTimeString = sqlTime.format('HH:mm:ss');
  queryParams.splice(t, 0,sqlTimeString);
  t=t+1;
}
// console.log(queryParams)
// console.log(mysql.format(sqlQuery, queryParams));
try{
const results=await query(sqlQuery, queryParams);
// console.log(results);
  res.send(results);
}
catch(err)
{
  console.error(err);
    // res.send(err)
    res.status(400)
    return;
}

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

app.get('/mybooking',async(req,res)=>{
  const sqlQuery = `
  SELECT s.schedule_id,s.start_place,s.end_place,s.date,s.time
  FROM schedules as s inner join merge as m on m.schedule_id=s.schedule_id and m.google_id=?`;
  queryParams=[req.user.google_id];
  try{
  const results=await query(sqlQuery, queryParams);
  // console.log(results);
  res.send(results);
}
catch(err)
{
  console.error(err);
      res.send(err)
      return;
}
})
app.get('/mycurrentbooking',async(req,res)=>{
  const sqlQuery = `
  SELECT s.schedule_id,s.start_place,s.end_place,s.date,s.time
  FROM schedules as s inner join merge as m on m.schedule_id=s.schedule_id and m.google_id=? and s.time >= CONVERT_TZ(NOW(), @@session.time_zone, '+05:30')`;
  queryParams=[req.user.google_id];
  try{
  const results=await query(sqlQuery, queryParams);
  // console.log(results);
  res.send(results);
}
catch(err)
{
  console.error(err);
      res.send(err)
      return;
}
})
app.get('/mypastbooking',async(req,res)=>{
  const sqlQuery = `
  SELECT s.schedule_id,s.start_place,s.end_place,s.date,s.time
  FROM schedules as s inner join merge as m on m.schedule_id=s.schedule_id and m.google_id=? and s.time <CONVERT_TZ(NOW(), @@session.time_zone, '+05:30')`;
  queryParams=[req.user.google_id];
  try{
  const results=await query(sqlQuery, queryParams);
  // console.log(results);
  res.send(results);
}
catch(err)
{
  console.error(err);
      res.send(err)
      return;
}
})
app.get('/join',async(req,res)=>{
  const sqlQuery=`insert into merge values(?,?)
  `
  queryParams=[req.user.google_id,req.query.schedule_id];
  try{
  const results=await query(sqlQuery, queryParams);
  // console.log(results);
    res.send(results);
}
catch(err)
{
  console.error(err);
  res.send(err)
  return;
}
})
app.get('/unjoin',async(req,res)=>{
  const sqlQuery=`delete from merge where google_id=? and schedule_id =?`
  queryParams=[req.user.google_id,req.query.schedule_id];
  try{
  const results=await query(sqlQuery, queryParams);
  const rows=await query('select * from merge where schedule_id=?',[req.query.schedule_id]);
  // console.log(rows,rows.length);
  if (rows.length === 0) {
    const schedule_id = req.query.schedule_id;
    const res1=await query(`
    DELETE FROM schedules
    WHERE schedule_id = ?
  `,[schedule_id]);
      const res2= await query(`
      DELETE FROM merge
      WHERE schedule_id = ?
    `,[schedule_id]);
  }
  // console.log(results);
    res.send(results);
} catch(err)
{
  console.error(err);
      res.send(err)
      return;
}

})
app.get('/createschedule',async (req,res)=>{
  const sqlQuery1=`insert into schedules values(?,?,?,?,?)`;
  const sqlQuery2=`insert into merge values(?,?)`;
  // console.log('create',req.query);
  scheduleid=req.user.google_id;
  scheduleid+='_';
  scheduleid+=req.query.startPlace;
  scheduleid+=req.query.endPlace;
  scheduleid+=req.query.date;
  scheduleid+=req.query.time;
//   const myDate = new Date(req.query.date);
//   myDate.setHours(req.query.time.substring(0, 2));
// myDate.setMinutes(req.query.time.substring(3, 5));
// myDate.setSeconds(req.query.time.substring(6, 8));
//   const myDateIST = myDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//   const mysqlDate = new Date(myDateIST).toISOString().slice(0, 19).replace('T', ' ');
//   const myDateTime = myDate.toISOString().slice(0, 19).replace('T', ' ');
const hash = crypto.createHash('md5').update(scheduleid).digest('hex');

// Convert the hash value to a number
const uniqueNumber = parseInt(hash, 16);
scheduleid=uniqueNumber;
moment.tz.setDefault('Asia/Kolkata');
const date = req.query.date;
const time = req.query.time;

// combine the date and time into a single string
const dateTimeString = `${date} ${time}`;

// convert the date and time to IST
const dateTimeIST = moment.tz(dateTimeString, 'YYYY-MM-DD HH:mm:ss', 'Asia/Kolkata');

// format the date and time for MySQL insertion
const formattedDateTime = dateTimeIST.format('YYYY-MM-DD HH:mm:ss');

// const indiaTime = myDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
//   const mysqlDate = new Date(indiaTime).toISOString().slice(0, 19).replace('T', ' ');

  queryParams1=[scheduleid,req.query.startPlace,req.query.endPlace, formattedDateTime , formattedDateTime];
  queryParams2=[req.user.google_id,scheduleid];
 try{
   const results=await query(sqlQuery1, queryParams1
    //, (err, results) => {
  //   // if (err) {
  //   //   console.error(err);
  //   //   res.send(err)
  //   //   return;
  //   // }
  //   // console.log(results);
  //   // const sqlQuery2=`insert into merge values(?,?)`;
  //   // queryParams2=[req.user.google_id,scheduleid];
  //   // console.log("Query 2 is running",scheduleid);
  //   // pool.query(sqlQuery2, queryParams2, (err, results) => {
  //   //   if (err) {
  //   //     console.error("q2",err);
  //   //     res.send(err)
  //   //     return;
  //   //   }
  //   //   console.log("q2",results);
  //   //   res.send(results);
  //   // });
  //   // res.send(results);
   //}
   );
  // console.log(results);
  const sqlQuery2=`insert into merge values(?,?)`;
  queryParams2=[req.user.google_id,scheduleid];
  // console.log("Query 2 is running",scheduleid);
  try{
 const results= await query(sqlQuery2, queryParams2);
  // console.log("q2",results);
    res.send(results);
}catch(err)
{
  console.error(err);
  res.send(err)
  return;
}
}
catch(err){
  console.error(err);
  res.send(err)
  return;
}
})
// app.get('/createschedule2',(req,res)=>{
//   const sqlQuery2=`insert into merge values(?,?)`;
//   scheduleid=req.user.google_id;
//   scheduleid+='_';
//   scheduleid+=req.query.date;
//   scheduleid+=req.query.time;
//   queryParams2=[req.user.google_id,scheduleid];
//   // console.log("Query 2",scheduleid);
//   pool.query(sqlQuery2, queryParams2, (err, results) => {
//     if (err) {
//       console.error("q2",err);
//       rses.send(err)
//       return;
//     }
//     console.log("q2",results);
//     res.send(results);
//   });
// })
app.get('/dropdownlist',async(req,res)=>{
  try{
    const results=await query('select * from places;');
    // console.log(results);
    res.send(results);
  }catch(err)
  {
    console.log(err);
  }
})

app.get('/users', async function(req, res){
  const query1 = 'select * from users';
  try{
    const results = await query(query1,[]);
    // console.log('results 451');
    // console.log((results));
    res.send(results);
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
});

app.get('/places', async function (req, res){
  const query1 = 'select * from places';
  try{
    const results = await query(query1,[]);
    // console.log('results 461');
    // console.log((results));
    res.send(results);
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
});


app.post('/places', async function(req, res){
  const places = (req.body.places);
  // console.log('479 places :'+places);
  // console.log('480 req.body.places: ');
  // console.log(JSON.stringify(places));
  const query1 = "delete from merge where schedule_id in (select schedule_id from schedules where (start_place = ? or end_place = ?))";
  const query2 = "delete from schedules where start_place = ? or end_place = ?";
  const query3 = "delete from places where place_name = ?";
  const queryParam1 = [places, places];
  const queryParam3 = [places];
  
  try {
    const results1 = await query(query1, queryParam1);
    const results2 = await query(query2, queryParam1);
    const results3 = await query(query3, queryParam3);
    // console.log('results1 :'+ JSON.stringify(results1));
    // console.log('results2 :'+JSON.stringify(results2));
    // console.log('results3 :'+JSON.stringify(results3));
    res.send('done');
  }

  catch(err) {
    console.log(err);
    res.send(err);
  }
});


app.post('/users', async function(req, res){
  const google_id = (req.body.google_id);
  // console.log('460 :'+google_id);
  // console.log('461 req.body.google_id: ');
  // console.log(JSON.stringify(google_id));
  const query1 = "delete from merge where google_id =?";
  const query2 = "delete from users where google_id = ?";
  const queryParam = [google_id];
  
  try {
    const results1 = await query(query1, queryParam);
    const results2 = await query(query2, queryParam);
    // console.log('results1 :'+ JSON.stringify(results1));
    // console.log('results2 :'+JSON.stringify(results2));
    res.send('done');
  }

  catch(err) {
    console.log(err);
    res.send(err);
  }
});

app.get('/schedules', async function(req, res){
  const query1 = 'select * from schedules';
  try{
    const results = await query(query1,[]);
    // console.log('results 528');
    // console.log((results));
    res.send(results);
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
});

app.post('/schedules', async function(req, res){
  const schedule_id = (req.body.schedule_id);
  // console.log('469 :'+schedule_id);
  // console.log('470 req.body.schedule_id: ');
  // console.log(JSON.stringify(schedule_id));
  const query1 = "delete from merge where schedule_id =?";
  const query2 = "delete from schedules where schedule_id = ?";
  const queryParam = [schedule_id];
  
  try {
    const results1 = await query(query1, queryParam);
    const results2 = await query(query2, queryParam);
    // console.log('results1 :'+ JSON.stringify(results1));
    // console.log('results2 :'+JSON.stringify(results2));
    res.send('done');
  }

  catch(err) {
    console.log(err);
    res.send(err);
  }
});

app.post('/newPlace', async function(req, res){
  const newPlace = req.body.newPlace;
  const newValue = {
    place_name: newPlace
  }
  // console.log("567 newPlace"+newPlace);
  const query1 = 'insert into places set ?';
  const queryParam = [newValue];
  try {
    const results = await query(query1, queryParam);
    // console.log('results :'+JSON.stringify(results));
    res.redirect('http://localhost:3000/places');
  }

  catch(err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = pool;
app.use(profileRoutes)
app.use(bodyParser.json());

app.post('/profile3', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  // console.log("Hello phone: " + phoneNumber);
  // console.log("USer google_id details:" + JSON.stringify(req.user.google_id));
  
  pool.query('UPDATE users SET phone = ? WHERE google_id = ?', [phoneNumber,req.user.google_id],(err,res)=>
  {
    if(err)
    {
      console.log(err);
      return;
    }
    // console.log('updated');
  });
  
});
app.get('/profile2', (req, res) => {
  // handle GET request for /users endpoint
  pool.query('select * from users where google_id=?',[req.user.google_id],(err,results)=>{
    if(err)
    {
      console.log(err);
      return;
    }
    // console.log(results[0].name);

    res.send(results[0]);
  })
});
app.use(searchRoutes)
app.listen(8080, () => {
  console.log('Server started on port 8080');
});

// app.post('/profile3', (req, res) => {
//   const phoneNumber = req.body.phone;
//   console.log("Hello phone: " + phoneNumber);
// });
  // // perform database operation to store/update the phone number
  // const sql = 'INSERT INTO users (phone) VALUES (?) ON DUPLICATE KEY UPDATE phone = ?';
  // connection.query(sql, [phoneNumber, phoneNumber], (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Failed to update phone number.' });
  //   } else {
  //     res.json({ success: true });
  //   }
  // });