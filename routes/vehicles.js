const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicles');

router.get('/', (request, response, next) =>{
  console.log("Vehicle begin");

  Vehicle.find({id: 1}, (err, vehicle) => {
    if (err) return console.error(err);
    console.log("Vehicle", vehicle);
    response.send(`VEHICLES GET: respond with a resource  ${(new Date()).getTime()}`);
  });
});

router.head('/', (request, response, next) =>{
  response.send('VEHICLES HEAD: respond with a resource');
});

router.post('/', (request, response, next) =>{
  response.send(`VEHICLES POST: respond with a resource ${(new Date()).getTime()}`);
});

module.exports = router;