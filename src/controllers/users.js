'use strict'

/**
 * Parse request data
 * Validate request data
 * Call operation(s)
 * Set response
 */

const operations = require('../operations/users')
const { validate } = require('../validations')
const schemas = require('../validations/schemas/users')

const getAll = (ctx) => {
	ctx.body = operations.getAll()
}

const getById = (ctx) => {
	const user = {
		id: parseInt(ctx.params.id)
	}
	validate(schemas.userId, user)
	ctx.body = operations.getById(user.id)
}

const login = async(ctx) => {
	const user = {
		email: ctx.request.body.email,
		password: ctx.request.body.password
	}

	validate(schemas.login, user)
	ctx.body = await operations.login(user)
}

const signUp = async(ctx) => {
	const input = {
		name: ctx.request.body.name,
		email: ctx.request.body.email,
		password: ctx.request.body.password
	}
	
	validate(schemas.signUp, input)
	ctx.body = await operations.signUp(input)
}

module.exports = {
	getAll,
	getById,
	signUp,
	login
}