const express = require('express');
const router = express.Router();


// router.get('/search', (req, res) => {
//   // handle GET request for /users endpoint
//   console.log("search",req.query)
//   try{
//     pool.query('select * from schedules where startPlace in ',req.query.startPlace,' and endPlace in ',req.query.endPlace,' and date =',req.query.date,' and time=',req.query.time,(results,fields)=>{console.log(results)});
//   }catch(err)
//   {
//     console.log(err);
//   }
  
//   res.send(req.user);
// });



module.exports = router;