'use strict';

const request = require('request-promise');

request({ url: 'http://swapi.co/api/people/1', json: true }).then(res => {
	const promises = res.vehicles.map(vehicle => request({ url: vehicle, json: true }));
	return Promise.all(promises);
}).map(vehicle => {
	console.log(vehicle.name);
}).catch(err => {
	console.error(err);
});