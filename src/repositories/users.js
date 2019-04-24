'use strict'

/**
 * Abstract from specific database/ORM
 * Simplify database calls for operations
 */

const _ = require('lodash')
const usersDB = require('../database/users')

const findById = (id) => {
	return _.find(usersDB, { id: parseInt(id) })
}

const findByEmail = (email) => {
	return _.find(usersDB, { email })
}

const getAllUsers = () => {
	return usersDB
}

const create = (user) => {
	user.id = usersDB.length + 1
	usersDB.push(user)
	return {...user}
}

module.exports = {
	findById,
	findByEmail,
	getAllUsers,
	create
}