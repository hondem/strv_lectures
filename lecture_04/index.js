'use strict';

const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const pino = require('./utils/logger')
const routes = require('./routes')


const app = new Koa()

/**
 * Applying middlewares
 */
app.use((ctx, next) => {
	pino.info('Incomming request: ', ctx.request)
	return next()
})

app.use(bodyparser())
app.use(routes)

app.listen(5000)