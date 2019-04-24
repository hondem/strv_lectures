'use strict'

const articleId = {
	type: 'Object',
	required: true,
	properties: {
		id: {
			type: 'integer',
			required: true,
			min: 1,
		}
	}
}

const article = {
	type: 'Object',
	required: true,
	properties: {
		text: {
			type: 'string',
			required: 'true'
		}
	}
}

module.exports = {
	articleId,
	article
}