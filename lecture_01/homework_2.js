'use strict';

const request = require('request-promise');

request('http://swapi.co/api/people/1').then(res => {
	let parsedResult = JSON.parse(res);

	let promises = parsedResult.vehicles.map(vehicle => request(vehicle));
	return Promise.all(promises);
}).then(res => {
	res.forEach(vehicle => {
		console.log(JSON.parse(vehicle).name);
	});
}).catch(err => {
	console.error(err);
});