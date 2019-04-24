'use strict'

const usersRepository = require('../repositories/users')

const errors = require('../utils/errors')
const logger = require('../utils/logger')
const crypto = require('../utils/crypto')

const getAll = () => {
	return usersRepository.getAllUsers()
}

const getById = (id) => {
	const user = usersRepository.findById(id)
	
	if(!user){
		throw new errors.NotfoundError()		
	}

	return user
}

const verifyTokenPayload = async(input) => {
	const jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
	const now = Date.now()
	if(!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) throw new errors.UnauthorizedError()

	const userId = parseInt(jwtPayload.userId)
	const user = await usersRepository.findById(userId)
	if (!user) throw new errors.UnauthorizedError()

	return {
		user,
		loginTimeout: jwtPayload.exp * 1000
	}
}

const signUp = async(input) => {
	logger.info({ input }, 'signUp start')

	const user = {
		name: input.name,
		email: input.email.toLowerCase(),
		password: await crypto.hashPassword(input.password)
	}

	const alreadyExists = usersRepository.findByEmail(user.email)
	if(alreadyExists) throw new errors.UserExistsError()

	const createdUser = await usersRepository.create(user)
	createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)
	logger.info('signUp ended')
	return createdUser
}

const login = async(input) => {
	const user = await usersRepository.findByEmail(input.email.toLowerCase())

	if(!user) throw new errors.UnauthorizedError()

	const verified = await crypto.comparePasswords(input.password, user.password)
	if (!verified) throw new errors.UnauthorizedError()

	const accessToken = await crypto.generateAccessToken(user.id)

	return {
		id: user.id,
		email: user.email,
		accessToken
	}
}

module.exports = {
	getAll,
	getById,
	signUp,
	login,
	verifyTokenPayload
}