const express = require('express');
const router = express.Router();
var five = require("johnny-five");
var board = new five.Board();
const internalIp = require('internal-ip');
var exec = require('child_process').exec;

function shutdown(callback) {
  exec('sudo /sbin/shutdown now', function (msg) { console.log(msg) });
}

board.on("ready", () => {

  servo = new five.Servo({
    pin: 9,
    center: true
  })
});




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


router.get('/arduino', (req, res, next) => {

  res.render('arduino');
});

router.post('/arduino', (req, res, next) => {





  switch (req.body.mov) {

    case 38:
      console.log("Hacia adelante")
      var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1;
      //Motor B es el derecho
      var motorA = new five.Motor(configs.A);
      var motorB = new five.Motor(configs.B);
      motorB.forward(255)
      motorA.forward(255)

      res.json({ distancia: "distancia" })
      break
    case 40:

      console.log("Hacia detras")
      var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1;

      var motorA = new five.Motor(configs.A);
      var motorB = new five.Motor(configs.B);

      motorA.reverse(255)
      motorB.reverse(255)

      res.json({ distancia: "distancia" })

      break
    case 37:

      var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1;

      var motorB = new five.Motor(configs.B);

      motorB.forward(255)
      res.json({ distancia: "distancia" })


      break;
    case 39:
      var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1;

      var motorA = new five.Motor(configs.A);

      motorA.forward(255)
      res.json({ distancia: "distancia" })

      break;
    case "stop":
      var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1;

      var motorA = new five.Motor(configs.A);
      var motorB = new five.Motor(configs.B);

      motorA.stop()
      motorB.stop()
      res.json({ distancia: "distancia" })
      break
    default:
      break
  }
})

module.exports = router;
