'use strict'

const errors = require('../utils/errors')
const { validate } = require('../validations')
const schemas = require('../validations/schemas/users')
const operations = require('../operations/users')


const authenticate = async(ctx, next) => {
	if (!ctx.header.authorization) throw new errors.UnauthorizedError()

	const input = { jwtToken: ctx.header.authorization }
	validate(schemas.jwtToken, input)
	
	const data = await operations.verifyTokenPayload(input)
	if (ctx.response && data.loginTimeout) ctx.set('Login-timeout', data.loginTimeout)
	
	ctx.state.user = data.user
	return next()
}

module.exports = {
	authenticate
}