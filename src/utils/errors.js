/* eslint-disable max-classes-per-file, max-len */

'use strict'

class AppError extends Error{
	constructor(message, type, status){
		super()
		this.message = message
		this.type = type
		this.status = status
	}
}

class ValidationError extends AppError{
	constructor(message, errors){
		super(message || "Data validation failed", "VALIDATION_ERROR", 400)
		this.errors = errors
	}
}

class NotfoundError extends AppError{
	constructor(message, errors){
		super(message || "Team of highly trained monkeys are working on delivering the content that doesn't exist", "NOT_FOUND", 404)
		this.errors = errors
	}
}

class InternalError extends AppError{
	constructor(message, errors){
		super(message || "Internal error occured", "INTERNAL_ERROR", 500)
		this.errors = errors
	}
}

class UserExistsError extends AppError{
	constructor(message, errors){
		super(message || "User already exists, please choose different email", "USER_EXISTS", 500)
		this.errors = errors
	}
}

class UnauthorizedError extends AppError{
	constructor(message, errors){
		super(message || "Unauthorized access", "USER_UNAUTHORIZED", 500)
		this.errors = errors
	}
}

module.exports = {
	AppError,
	ValidationError,
	NotfoundError,
	InternalError,
	UserExistsError,
	UnauthorizedError
}