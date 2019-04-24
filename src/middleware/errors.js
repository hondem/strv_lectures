'use strict'

const errors = require('../utils/errors')
const logger = require('../utils/logger')

const handleErrors = async(ctx, next) => {
	try{
		return await next()
	} catch (err){

		let responseError = err

		if(!(err instanceof errors.AppError)){
			responseError = new errors.InternalError()
		}

		ctx.status = responseError.status
		ctx.body = {
			type: responseError.type,
			message: responseError.message
		}

		logger.error({
			status: responseError.status,
			type: responseError.type,
			message: responseError.message
		});

	}
}

const handleNotFound = () => {
	throw new errors.NotfoundError()
}

module.exports = {
	handleErrors,
	handleNotFound
}