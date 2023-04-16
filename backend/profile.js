const express = require('express');
const router = express.Router();

router.get('/profile2', (req, res) => {
  // handle GET request for /users endpoint
  console.log("profile",req.isAuthenticated())
  res.send(req.user);
});



module.exports = router;