'use strict';

const request = require('request-promise');

(async() => {
	try{
		const lukeData = JSON.parse(await request('http://swapi.co/api/people/1'));
		
		let promises = lukeData.vehicles.map(vehicle => request(vehicle));
		return Promise.all(promises);
	} catch (err){
		console.err(err);
	}
})().then(response => {
	response.forEach(vehicle => {
		console.log(JSON.parse(vehicle).name);
	});
}).catch(err => {
	console.err(err);
});