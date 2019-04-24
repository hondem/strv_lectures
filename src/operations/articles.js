'use strict'

const logger = require('../utils/logger')
const errors = require('../utils/errors')

/**
 * Perform business logic
 * Throw errors
 */

const articleRepository = require('../repositories/articles')

const getAll = () => {
	return articleRepository.getAll()
}

const getById = (id) => {
	const article = articleRepository.findById(id)
	
	if(!article){
		throw new errors.NotfoundError()
	}
	return article
}

const create = (article) => {
	return articleRepository.create(article)
}

module.exports = {
	getAll,
	getById,
	create
}