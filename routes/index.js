const express = require('express');
const router = express.Router();
const internalIp = require('internal-ip');
var exec = require('child_process').exec;


function shutdown(callback) {
  exec('shutdown now', function (error, stdout, stderr) { callback(stdout); });
}


/* GET home page */
router.get('/', (req, res, next) => {
  let data = {
    ip: internalIp.v4.sync()
  }

  res.render('index', data);
});

router.post("/shutdown", (req, res, next) => {
  shutdown(function (output) {
    console.log(output);
  });
})

module.exports = router;
