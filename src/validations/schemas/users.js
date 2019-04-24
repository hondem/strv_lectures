'use strict'

const user = {
	type: 'Object',
	required: true,
	properties: {
		username: {
			type: 'string',
			required: true
		},
		firstname: {
			type: 'string',
			required: true
		},
		lastname: {
			type: 'string',
			required: true
		}
	}
}

const userId = {
	type: 'Object',
	required: true,
	properties: {
		id: {
			type: 'integer',
			required: true
		}
	}
}

const signUp = {
	type: 'Object',
	required: true,
	properties: {
		name: {
			type: 'string',
			required: true,
		},
		email: {
			type: 'string',
			format: 'email'
		},
		password: {
			type: 'string',
			required: true,
			minLength: 8
		}
	}
}

const login = {
	type: 'Object',
	required: true,
	properties: {
		email: {
			type: 'string',
			format: 'email'
		},
		password: {
			type: 'string',
			required: true,
			minLength: 8
		}
	}
}

const jwtToken = {
  type: 'Object',
  required: true,
  properties: {
    jwtToken: { type: 'string', required: true },
  },
}

module.exports = {
	user,
	userId,
	signUp,
	login,
	jwtToken
}