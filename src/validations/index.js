'use strict'

const jsonschema = require('jsonschema')
const errors = require('../utils/errors')

const validate = (schema, data) => {
	const validator = new jsonschema.Validator()
	const validationErrors = validator.validate(data, schema).errors

	if(validationErrors.length > 0){
		throw new errors.ValidationError()	
	}
}

module.exports = {
	validate
}