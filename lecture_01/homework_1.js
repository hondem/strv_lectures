'use strict';

const request = require('request');


let lukeSkywalkerData = null;
let vehiclesData = [];

/**
 * Fetching data about Luke Skywalker from API
 */
request('http://swapi.co/api/people/1', (err, response, body) => {
	if(err){
		console.error("Error occured while fetching data about Luke: ", err);
	} else {
		lukeSkywalkerData = JSON.parse(body);

		/**
		 * Fetching data about vehicles from API
		 */
		lukeSkywalkerData.vehicles.forEach(vehicle => {
			request(vehicle, (err2, response2, body2) => {
				if(err2){
					console.error("Error occured while fetching data about vehicles: ", err2);
				} else {
					vehiclesData.push(JSON.parse(body2));

					/**
					 * Lets check if we receieved all information
					 * This is... I think bad solution? O.o
					 */
					if(vehiclesData.length === lukeSkywalkerData.vehicles.length){
						vehiclesData.map(vehicle => {
							console.log(vehicle.name);
						});
					}
				}
			});
		});
	}
});