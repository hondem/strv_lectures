'use strict';

const request = require('request-promise');

(async() => {
	try{
		const lukeData = JSON.parse(await request('http://swapi.co/api/people/1'));
		const promises = lukeData.vehicles.map(vehicle => request({ url: vehicle, json: true }));
		const result = await Promise.all(promises);

		result.map(vehicle => {
			console.log(vehicle.name);
		});
	} catch (err){
		console.err(err);
	}
})().catch(err => {
	console.err(err);
});