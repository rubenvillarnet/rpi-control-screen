const express = require('express');
const router = express.Router();
const internalIp = require('internal-ip');
var exec = require('child_process').exec;

function shutdown(callback) {
  exec('sudo /sbin/shutdown now', function (msg) { console.log(msg) });
}

//require('child_process').exec('sudo /sbin/shutdown -r now', function (msg) { console.log(msg) });


/* GET home page */
router.get('/', (req, res, next) => {
  let data = {
    ip: internalIp.v4.sync()
  }

  res.render('index', data);
});

router.post("/shutdown", (req, res, next) => {

  console.log("shutdown has been pushed")
  shutdown(function (output) {
    console.log(output);
  })
})

module.exports = router;
