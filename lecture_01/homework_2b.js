'use strict';

/**
 * In this case .then(...).map(...) won't work
 * Since we use request-promise-native instead of request-promise
 */
const request = require('request-promise-native');

request({ url: 'http://swapi.co/api/people/1', json: true }).then(res => {
	const promises = res.vehicles.map(vehicle => request({ url: vehicle, json: true }));
	return Promise.all(promises);
}).then(res => {
	return res.map(vehicle => {
		/**
		 * Normally we would log it here, but for educational purpose we won't
		 */
		//console.log(vehicle.name);
		return vehicle;
	})
}).then(array => {
	array.map(vehicle => {
		console.log(vehicle.name);
	})
}).catch(err => {
	console.error(err);
});