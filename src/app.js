const express = require('express')
require('express-async-errors')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuid = require('uuid')
const path = require('path')
const log = require('./logging')
const config = require('./config')
const { Context, getDirs, toSyncFn } = require('./common')
const app = express()

// config
const apisFolderName = 'apis'
const port = config.server.port
const basePath = config.server.basePath

app.use(compression())

app.use((req, res, next) => {
  req.ctx = Context.fromRequestId(req.get('X-Request-ID') || uuid.v4())
  req.log = req.ctx.log
  res.setHeader('X-Request-ID', req.ctx.reqId)
  next()
})

app.use((req, res, next) => {
  req.log.debug({
    direction: 'inbound',
    req: req
  })
  res.on("finish", () => {
    req.log.debug({
      direction: 'outbound',
      res: res
    })
  })
  next()
})

app.use(cors(config.server.cors))

app.use(bodyParser.json())

// load & register all routers by their relative path
var routePath = path.join(__dirname, apisFolderName)
log.info('start loading router from path: %s ...', routePath)
getDirs(routePath, '2', 1).filter(v => /.*\/v[0-9]{1}$/.test(v)).forEach(moduleDir => {
  let apiPath = path.join(basePath, moduleDir.replace(routePath, ''))
  log.info('module: %s loading...', moduleDir)
  app.use(apiPath, require(moduleDir))
  log.info('registered path of router: %s', apiPath)
})
getDirs(routePath, '1', 1).filter(v => !/.*.test.js$/.test(v)).forEach(file => {
  let apiPath = path.join(basePath, file.replace(routePath, '').replace('.js', ''))
  log.info('file: %s loading...', file)
  app.use(apiPath, require(file))
  log.info('registered path of router: %s', apiPath)
})

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    code: "SERVER_ERROR",
    msg: 'internal service error occured',
    errors: err.message
  })
  req.log.error({
    err: err,
    req: req,
    res, res
  })
  next()
})

const server = app.listen(port, () => {
  log.info(`Service Started on Port ${port} with Base Path ${basePath}`)
})

// graceful shutdown
process.on('SIGTERM', () => toSyncFn(async () => {
  const info = await new Promise((res, rej) => {
    server.close((e) => {
      e ? rej(e) : res(true)
    })
  })
  log.trace('Service Shutting down %s', info)
}))
