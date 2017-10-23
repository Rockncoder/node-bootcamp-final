const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicles');
const constants = require('../constants/constants');

function properCase(initial) {
  const [first, ...rest] = Array.from(initial.toLowerCase());
  return [first.toUpperCase(), ...rest].join('');
}

router.get('/:make/:model', (request, response) => {
  const make = properCase(request.params.make);
  const model = properCase(request.params.model);

  Vehicle.find({make, model}, (err, vehicles) => {
    if (err) return console.error(err);
    response.json(vehicles);
  }).sort({year: constants.DESCENDING}).limit(PAGE_COUNT);
});


router.head('/:id', (request, response) => {
  const id = request.params.id;
  const idIsNumber = !isNaN(parseInt(id, 10));
  console.log('HEAD');

  if (idIsNumber) {
    Vehicle.count({id}, (err, count) => {
      if (err) return console.error(err);
      console.log(`head found ${count}`);
      response.set({
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': count
      });
      response.end();
    });
  } else {
    const make = properCase(id);
    Vehicle.count({make}, (err, count) => {
      if (err) return console.error(err);
      console.log(`head found <${count}>`);
      response.set({
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': count
      });
      response.end();
    }); //.limit(PAGE_COUNT);
  }
});

router.get('/:id', (request, response, next) => {
  const id = request.params.id;
  const idIsNumber = !isNaN(parseInt(id, 10));

  if (idIsNumber) {
    Vehicle.findOne({id}, (err, vehicle) => {
      if (err) return console.error(err);
      response.json(vehicle);
    });
  } else {
    const make = properCase(id);
    Vehicle.find({make}, (err, vehicles) => {
      if (err) return console.error(err);
      response.json(vehicles);
    }).limit(constants.PAGE_COUNT);
  }
});


router.get('/', (request, response, next) => {
  Vehicle.find({}, (err, vehicle) => {
    if (err) return console.error(err);
    response.json(vehicle);
  }).limit(constants.PAGE_COUNT);
});

router.head('/', (request, response, next) => {
  response.send('VEHICLES HEAD: respond with a resource');
});

router.post('/', (request, response, next) => {
  response.send(`VEHICLES POST: respond with a resource ${(new Date()).getTime()}`);
});

module.exports = router;