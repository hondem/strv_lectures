'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('../middleware/errors')
const { authenticate } = require('../middleware/auth')

/**
 * Controllers
 */
const articleController = require('../controllers/articles')
const usersController = require('../controllers/users')

const router = new Router()

router.use(handleErrors)

/**
 * Routes for articles
 */
router.get('/articles', authenticate, articleController.getAll)
router.get('/articles/:id', authenticate, articleController.getById)
router.post('/articles', authenticate, articleController.create)

/**
 * Routes for users
 */
router.get('/users', usersController.getAll)
router.get('/users/:id', usersController.getById)
router.post('/users', usersController.signUp)
router.post('/users/login', usersController.login)

router.use(handleNotFound)

module.exports = router.routes()