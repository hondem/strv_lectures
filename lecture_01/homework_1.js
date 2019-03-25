'use strict';

const request = require('request');

const BASE_URL = 'http://swapi.co/api/';

/**
 * Get someone's record from DB
 * @param {*} id 
 */
const getSomeone = id => {
	request({ url: `${BASE_URL}people/${id}` , json: true }, (err, response, body) => {
		if(err){
			console.error("Error occured while fetching data about Luke: ", err);
			return;
		}
		
		body.vehicles.forEach(vehicle => {
			getVehicle(vehicle);
		});
	});
}

/**
 * Get certain vehicle
 * @param {*} url 
 */
const getVehicle = url => {
	request({ url , json: true }, (err, response, body) => {
		if(err){
			console.error("Error occured while fetching data about Luke: ", err);
			return;
		}

		console.log(body.name);
	});
}

getSomeone(1);
