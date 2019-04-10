'use strict';

const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const uuid = require('uuid')
const pino = require('pino')({ prettyPrint: true })

const app = new Koa()
const router = new Router()

/**
 * This is some... 'local' database of articles
 */
const articles = []

const getTargetArticle = (articleId) => {
	return articles.find( article => { return article.id === articleId })
}

/**
 * Implementing router
 */
router.get('/articles', ctx => {
	ctx.response.body = articles
})

router.get('/article/:id', ctx => {
	const targetArticle = getTargetArticle(ctx.params.id)

	if (targetArticle){
		ctx.response.body = targetArticle
	}
})

router.post('/article', ctx => {
	articles.push({ id: uuid(), text: ctx.request.body.text })
	ctx.response.status = 201
})

router.delete('/article/:id', ctx => {
	const targetArticle = getTargetArticle(ctx.params.id)
	
	if(targetArticle){
		articles.splice(articles.indexOf(targetArticle), 1)
		ctx.response.status = 200
	}
})

router.put('/article/:id', ctx => {
	const targetArticle = getTargetArticle(ctx.params.id)

	if(targetArticle){
		targetArticle.text = ctx.request.body.text
		ctx.response.status = 200
	}
})

/**
 * Applying middlewares
 */
app.use((ctx, next) => {
	pino.info('Incomming request: ', ctx.request)
	return next()
})

app.use(bodyparser())
app.use(router.routes())

app.listen(5000)