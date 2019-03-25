'use strict';

const request = require('request-promise');

(async() => {
	try{
		const lukeData = await request({ url: 'http://swapi.co/api/people/1', json: true });
		const promises = lukeData.vehicles.map(vehicle => request({ url: vehicle, json: true }));
		const result = await Promise.all(promises);

		result.map(vehicle => {
			console.log(vehicle.name);
		});
	} catch (err){
		console.error(err);
	}
})();