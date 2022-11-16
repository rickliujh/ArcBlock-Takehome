const axios = require('axios')
const ethers = require('ethers')
const { query, validationResult } = require('express-validator')
const config = require('../config')
const db = require('../db')
const { Pageable } = require('../common')
module.exports = require('express').Router()

  .get('/txs',
    query('address').custom(v => ethers.utils.isAddress(v)),
    query('pageSize').isInt().custom(v => v <= 1000 && v >= 1).withMessage('pageSize should not lower than 1 and greater than 1000'),
    query('pageNum').isInt(),
    async (req, res) => {
      const err = validationResult(req)
      if (!err.isEmpty()) return res.status(400).send({
        code: 'ARGUMENTS_INVALID',
        msg: 'agruments validation failed',
        errors: err.array()
      })

      let address = req.query.address
      let pageable = new Pageable(
        parseInt(req.query.pageSize) || 10,
        parseInt(req.query.pageNum) || 1
      )

      req.log.info('requerst params, pageable: %s', pageable)
      const result = await axios.get('https://api.etherscan.io/api', {
        params: {
          module: 'account',
          action: 'txlist',
          address: address,
          startblock: 0,
          endblock: 9999999999,
          page: pageable.number,
          offset: pageable.size * (pageable.number - 1),
          sort: 'asc',
          apikey: config.blockchain.ethereum.providers.etherscan.token
        }
      })

      res.send({
        code: "SUCCESS",
        msg: 'OK',
        data: result.data.result,
        nextPage: {
          size: pageable.size,
          number: pageable.number + 1
        }
      })
    })