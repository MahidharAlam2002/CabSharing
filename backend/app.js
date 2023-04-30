require('dotenv').config();
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
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT,
  ssl:true
});
const query = promisify(pool.query).bind(pool);
// serialize and deserialize user information
passport.serializeUser((user, done) => {
  
  done(null, user.google_id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM users WHERE google_id = ?', [id], (err, rows) => {
    done(err, rows[0]);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALL_BACK_URL,
  scope: ['profile', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails ,photos} = profile;
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
    
    pool.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) done(err);
      newUser.id = res.insertId;
      return done(null, newUser);

     
    });
  });
}));



app.get('/', (req, res) => {
  res.redirect(process.env.FRONT_END);
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/home',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res){
    
    if(req.user.google_id==='110671206414098862281' || req.user.google_id==='104607823624198558021' || req.user.google_id==='112766095813271316268' || req.user.google_id==='117191595535130300633'){
      res.redirect(process.env.FRONT_END + 'users');
    }
    else{
      res.redirect(process.env.FRONT_END + 'home');
    }
  }
);
app.get('/api/authenticate',(req,res)=>{
  res.send(req.user);
})
app.get('/logout',(req,res)=>{
  req.logout((err)=>{
    res.redirect(process.env.FRONT_END);
  })
})

app.get('/search', async (req, res) => {
 

  const startPlace = req.query.startPlace || null;
  const endPlace = req.query.endPlace || null;
  const searchDate = req.query.date || null;
  const searchTime = req.query.time || null;
  let datePlaceholder = searchDate ? '?' : 'CURDATE()';


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
 
  try{
    const results=await query(sqlQuery, queryParams);
    res.send(results);
  }
  catch(err)
  {
    console.error(err);
      // res.send(err)
      res.status(400)
      return;
  }

  
});

app.get('/mybooking',async(req,res)=>{
  const sqlQuery = `
  SELECT s.schedule_id,s.start_place,s.end_place,s.date,s.time
  FROM schedules as s inner join merge as m on m.schedule_id=s.schedule_id and m.google_id=?`;
  queryParams=[req.user.google_id];
  try{
  const results=await query(sqlQuery, queryParams);
  
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
 
  scheduleid=req.user.google_id;
  scheduleid+='_';
  scheduleid+=req.query.startPlace;
  scheduleid+=req.query.endPlace;
  scheduleid+=req.query.date;
  scheduleid+=req.query.time;

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


  queryParams1=[scheduleid,req.query.startPlace,req.query.endPlace, formattedDateTime , formattedDateTime];
  queryParams2=[req.user.google_id,scheduleid];
  try{
    const results=await query(sqlQuery1, queryParams1);
    
    const sqlQuery2=`insert into merge values(?,?)`;
    queryParams2=[req.user.google_id,scheduleid];
    
    try{
      const results= await query(sqlQuery2, queryParams2);
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

app.get('/dropdownlist',async(req,res)=>{
  try{
    const results=await query('select * from places;');
    
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
    res.send(results);
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
});


app.post('/places', async function(req, res){
  const places = (req.body.places);
  const query1 = "delete from merge where schedule_id in (select schedule_id from schedules where (start_place = ? or end_place = ?))";
  const query2 = "delete from schedules where start_place = ? or end_place = ?";
  const query3 = "delete from places where place_name = ?";
  const queryParam1 = [places, places];
  const queryParam3 = [places];
  
  try {
    const results1 = await query(query1, queryParam1);
    const results2 = await query(query2, queryParam1);
    const results3 = await query(query3, queryParam3);
    res.send('done');
  }

  catch(err) {
    console.log(err);
    res.send(err);
  }
});


app.post('/users', async function(req, res){
  const google_id = (req.body.google_id);
  const query1 = "delete from merge where google_id =?";
  const query2 = "delete from users where google_id = ?";
  const queryParam = [google_id];
  
  try {
    const results1 = await query(query1, queryParam);
    const results2 = await query(query2, queryParam);
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
    res.send(results);
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
});

app.post('/schedules', async function(req, res){
  const schedule_id = (req.body.schedule_id);
  const query1 = "delete from merge where schedule_id =?";
  const query2 = "delete from schedules where schedule_id = ?";
  const queryParam = [schedule_id];
  
  try {
    const results1 = await query(query1, queryParam);
    const results2 = await query(query2, queryParam);
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
  const query1 = 'insert into places set ?';
  const queryParam = [newValue];
  try {
    const results = await query(query1, queryParam);
    res.redirect(process.env.FRONT_END+'places');
  }

  catch(err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = pool;

app.use(bodyParser.json());

app.post('/profile3', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  
  pool.query('UPDATE users SET phone = ? WHERE google_id = ?', [phoneNumber,req.user.google_id],(err,res)=>
  {
    if(err)
    {
      console.log(err);
      return;
    }
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
    res.send(results[0]);
  })
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('Server started on port 8080');
  });
}

module.exports = app;
