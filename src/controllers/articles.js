'use strict'

/**
 * Parse request data
 * Validate request data
 * Call operation(s)
 * Set response
 */
const operations = require('../operations/articles')
const { validate } = require('../validations')
const schemas = require('../validations/schemas/articles')

const create = async(ctx) => {
	const article = {
		text: ctx.request.body.text
	}

	validate(schemas.article, article)
	ctx.body = await operations.create(article)
}

const getById = async(ctx) => {
	const article = {
		id: parseInt(ctx.params.id)
	}

	validate(schemas.articleId, article)
	ctx.body = await operations.getById(article.id)
}

const getAll = async(ctx) => {
	ctx.body = await operations.getAll()
}

module.exports = {
	create,
	getById,
	getAll
}