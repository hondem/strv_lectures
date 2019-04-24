'use strict'

/**
 * Abstract from specific database/ORM
 * Simplify database calls for operations
 */
const _ = require('lodash')
const articlesDB = require('../database/articles')

const findById = (id) => {
	return _.find(articlesDB, { id: parseInt(id) })
}

const getAll = () => {
	return articlesDB;
}

const create = (article) => {
	article.id = articlesDB.length + 1
	articlesDB.push(article)
	return article
}

module.exports = {
	findById,
	getAll,
	create
}