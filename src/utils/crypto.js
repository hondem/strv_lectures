'use strict'

const util = require('util')
const config = require('../config')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errors = require('../utils/errors')

const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)

const pepperify = (string) => {
	return crypto.createHmac('sha1', config.auth.secret).update(string).digest('hex')
}

const generateAccessToken = (userId) => {
	return jwtSign({ userId }, config.auth.secret, config.auth.createOptions)
}

const verifyAccessToken = (authToken) => {
	try {
		return jwtVerify(authToken, config.auth.secret, config.auth.verifyOptions)
	} catch (err) {
		if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) throw new errors.UnauthorizedError()
		throw new errors.UnauthorizedError()
	}
}

const hashPassword = (password) => {
	return bcrypt.hash(pepperify(password), config.auth.saltRounds)
}

const comparePasswords = (plaintext, ciphertext) => {
	return bcrypt.compare(pepperify(plaintext), ciphertext)
}

module.exports = {
	generateAccessToken,
	verifyAccessToken,
	hashPassword,
	comparePasswords
}