'use strict'

module.exports = {
	auth: {
		secret: "nc475yb9cb*)&n4fy0bt9vwcfnhuwhbv8hf9docgaewu348y983fsdhfelhf",
		saltRounds: 10,
		createOptions: {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `com.jandemel.test-app`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.jandemel.test-app`,
    },
	}
}