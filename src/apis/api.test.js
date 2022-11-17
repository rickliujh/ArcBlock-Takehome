const api = require('./api')
const app = require('express')()
const axios = require('axios')
const request = require('supertest')
const toJsonString = data => JSON.stringify(JSON.parse(data))

jest.mock('axios')
app.use((req, res, next) => {
  let mock = {}
  mock.info = console.log
  req.log = mock
  next()
})
app.use(api)

describe('testing of /api', () => {
  beforeEach(() => {
  })

  test('response 200', () => {
    axios.get.mockResolvedValue({ data: mockRes['response 200'].axiosMock })
    return request(app)
      .get('/txs?pageSize=1000&pageNum=2&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(mockRes['response 200'].response)
      })
  })

  test('pageSize not a int', () => {
    return request(app)
      .get('/txs?pageSize=\"1000\"&pageNum=2&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC')
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(mockRes['pageSize not a int'].response)
      })
  })

  test('pageSize overcome', () => {
    return request(app)
      .get('/txs?pageSize=1001&pageNum=2&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC')
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(mockRes['pageSize overcome'].response)
      })
  })

  test('address invalid', () => {
    return request(app)
      .get('/txs?pageSize=1000&pageNum=2&address=0xc5102fE935D9a28f877a67E360F050d81a3CC')
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(mockRes['address invalid'].response)
      })
  })
})

const mockRes = {
  'address invalid': {
    response: {
      "code": "ARGUMENTS_INVALID",
      "msg": "agruments validation failed",
      "errors": [
        {
          "value": "0xc5102fE935D9a28f877a67E360F050d81a3CC",
          "msg": "Invalid value",
          "param": "address",
          "location": "query"
        }
      ]
    }
  },
  'pageSize overcome': {
    response: {
      "code": "ARGUMENTS_INVALID",
      "msg": "agruments validation failed",
      "errors": [
        {
          "value": "1001",
          "msg": "pageSize should not lower than 1 and greater than 1000",
          "param": "pageSize",
          "location": "query"
        }
      ]
    }
  },
  'pageSize not a int': {
    response: {
      "code": "ARGUMENTS_INVALID",
      "msg": "agruments validation failed",
      "errors": [
        {
          "value": "\"1000\"",
          "msg": "Invalid value",
          "param": "pageSize",
          "location": "query"
        },
        {
          "value": "\"1000\"",
          "msg": "pageSize should not lower than 1 and greater than 1000",
          "param": "pageSize",
          "location": "query"
        }
      ]
    }
  },
  'response 200': {
    axiosMock: JSON.parse(`{
      "status": "1",
      "message": "OK",
      "result": [
          {
              "blockNumber": "14923745",
              "timeStamp": "1654647319",
              "hash": "0xf1c8253ca948a84b36a489f47860cff0838dedf7fc8a0576c2f0b7793c68ee5e",
              "nonce": "34",
              "blockHash": "0x13cccdc7754a85e77db1c1fb73ffec42fd03903484d9dc0121fb11d539f2e015",
              "transactionIndex": "41",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "100506674453",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb000000000000000000000000f8e6fdc3e5ac06184a0e196a80ea1045140b8f550000000000000000000000000000000000000000000070e71f8a44c486eab000",
              "contractAddress": "",
              "cumulativeGasUsed": "3338070",
              "gasUsed": "57168",
              "confirmations": "1061339",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923754",
              "timeStamp": "1654647464",
              "hash": "0x8b6a23c1b95b4b368bcb2ace5ed84e707305f7450bc83714b452244e895aa322",
              "nonce": "37",
              "blockHash": "0x3cad407d61b23c7a5ed74d901387f7758a58a603b2c0894702a679f0fb98bfc7",
              "transactionIndex": "84",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "87948019131",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb000000000000000000000000cdba56999e9c111b740ed181fbb18b7c3f88e7d4000000000000000000000000000000000000000000008c4a326c3490a1100000",
              "contractAddress": "",
              "cumulativeGasUsed": "8079839",
              "gasUsed": "57156",
              "confirmations": "1061330",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923760",
              "timeStamp": "1654647556",
              "hash": "0x732edb664ac7e29c61035ae3ee361b1691136682b003eb12a79e50c64fa0305e",
              "nonce": "40",
              "blockHash": "0x3d0316f8146aed820d04fb699aaa9e95a1973732a191d8c69f6670622541742e",
              "transactionIndex": "53",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "95489386448",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb00000000000000000000000097c5da137889f2912f2d610171c82faed45f0900000000000000000000000000000000000000000000002ec366241137eece5000",
              "contractAddress": "",
              "cumulativeGasUsed": "4096914",
              "gasUsed": "57156",
              "confirmations": "1061324",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923766",
              "timeStamp": "1654647643",
              "hash": "0x08e8cc23a99d9176ccb98b20b5ba587c8b3be5248fe98a97d7960226dfe12869",
              "nonce": "43",
              "blockHash": "0x67ad1d67fb32c8cd3ae3e51deae6a7b5b637fc92b0aa649c0cb6bffede028f85",
              "transactionIndex": "18",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "87602723039",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb000000000000000000000000a630b066413f143567b79b6a9ad62da70e3007fa000000000000000000000000000000000000000000082c774cff95c304da2000",
              "contractAddress": "",
              "cumulativeGasUsed": "2121337",
              "gasUsed": "57180",
              "confirmations": "1061318",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923772",
              "timeStamp": "1654647764",
              "hash": "0x5908f7e5e4cfe7a94c6f81636eeba8be80bcd3df6c839470b548ae8f569f26c7",
              "nonce": "46",
              "blockHash": "0x2aced7162c1ebccce46aab592d34ecd532a9c40eef209a65ff0c087a54d8b84f",
              "transactionIndex": "27",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "110962867587",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb0000000000000000000000009cc947d8f65a092161f72cb7fea52c5e576a31c6000000000000000000000000000000000000000000017dbbc78ff80fb08bc000",
              "contractAddress": "",
              "cumulativeGasUsed": "3132671",
              "gasUsed": "57180",
              "confirmations": "1061312",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923778",
              "timeStamp": "1654647927",
              "hash": "0x273956f188e92a26e7e39b22f33fd501987230fa774701fd86879ae5d8898b9d",
              "nonce": "49",
              "blockHash": "0x35bfab1c21d83cd3b09b2f3589b2b6173c2ef9ed4f01e62aa15be61d1d72e4d9",
              "transactionIndex": "43",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "121526621276",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb0000000000000000000000002ecccc331181acdc6545685d310215fdd68d161200000000000000000000000000000000000000000000512420b461ae0d1d3000",
              "contractAddress": "",
              "cumulativeGasUsed": "2607657",
              "gasUsed": "57168",
              "confirmations": "1061306",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923781",
              "timeStamp": "1654648009",
              "hash": "0xe0e846212dddeb6a55ca993ab196c3ec1ca9f02461132299fe773c89abb2c529",
              "nonce": "52",
              "blockHash": "0x7979408fe8bbd7d44f3e56db604304dae5190f0e64738bd21fc4f3f39c86a715",
              "transactionIndex": "70",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "128586045391",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb000000000000000000000000a77879e9744fb1d7126bd437aca0ff7fb359c5b3000000000000000000000000000000000000000000002226c3f2e42569cb3000",
              "contractAddress": "",
              "cumulativeGasUsed": "4036501",
              "gasUsed": "57168",
              "confirmations": "1061303",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923788",
              "timeStamp": "1654648107",
              "hash": "0xd48b41c6de82f231d2b005ee40bf319a98c24ce02bad05596cf000d03918f278",
              "nonce": "55",
              "blockHash": "0xee44c9c3f07375038744b1fb1c5c84f57773b15132d64285e79b17c9afaae40f",
              "transactionIndex": "36",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "100591294172",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb000000000000000000000000241bca8cc90dd5b8118da2c1aa29119beecb25c3000000000000000000000000000000000000000000005b97829b7f39b4c20000",
              "contractAddress": "",
              "cumulativeGasUsed": "2540278",
              "gasUsed": "57156",
              "confirmations": "1061296",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923793",
              "timeStamp": "1654648219",
              "hash": "0x45292a4c4833ce091aa7c8c0f43330dae4e3de7e02b09709f0361f94f8686f87",
              "nonce": "58",
              "blockHash": "0x2c984921e4a292e8c9ba93693d0c5db6adc8bce4899d7fc769a784e33e3e660b",
              "transactionIndex": "104",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "104246375818",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb0000000000000000000000003f0e648daed617c372b87c621b88f7e2be321794000000000000000000000000000000000000000000002b6dc18a86095f1c6000",
              "contractAddress": "",
              "cumulativeGasUsed": "4696309",
              "gasUsed": "57168",
              "confirmations": "1061291",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          },
          {
              "blockNumber": "14923798",
              "timeStamp": "1654648285",
              "hash": "0xb56d7c7d5d4a79534828d07149ca79f798aeb379d139a7ab1e3990bda10996d9",
              "nonce": "61",
              "blockHash": "0x65fa8282da4d7a78e3969f39ac60e754b5253fce3753540be68c953ff249d9db",
              "transactionIndex": "31",
              "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
              "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
              "value": "0",
              "gas": "6000000",
              "gasPrice": "88910817978",
              "isError": "0",
              "txreceipt_status": "1",
              "input": "0xa9059cbb000000000000000000000000c465e19c7e1dfa9dc6d898113cb1399a0a883a390000000000000000000000000000000000000000000225434c1479da9ba31000",
              "contractAddress": "",
              "cumulativeGasUsed": "1609286",
              "gasUsed": "57180",
              "confirmations": "1061286",
              "methodId": "0xa9059cbb",
              "functionName": "transfer(address _to, uint256 _value)"
          }
      ]
    }`),
    response: {
      "code": "SUCCESS",
      "msg": "OK",
      "data": [
        {
          "blockNumber": "14923745",
          "timeStamp": "1654647319",
          "hash": "0xf1c8253ca948a84b36a489f47860cff0838dedf7fc8a0576c2f0b7793c68ee5e",
          "nonce": "34",
          "blockHash": "0x13cccdc7754a85e77db1c1fb73ffec42fd03903484d9dc0121fb11d539f2e015",
          "transactionIndex": "41",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "100506674453",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb000000000000000000000000f8e6fdc3e5ac06184a0e196a80ea1045140b8f550000000000000000000000000000000000000000000070e71f8a44c486eab000",
          "contractAddress": "",
          "cumulativeGasUsed": "3338070",
          "gasUsed": "57168",
          "confirmations": "1061339",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923754",
          "timeStamp": "1654647464",
          "hash": "0x8b6a23c1b95b4b368bcb2ace5ed84e707305f7450bc83714b452244e895aa322",
          "nonce": "37",
          "blockHash": "0x3cad407d61b23c7a5ed74d901387f7758a58a603b2c0894702a679f0fb98bfc7",
          "transactionIndex": "84",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "87948019131",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb000000000000000000000000cdba56999e9c111b740ed181fbb18b7c3f88e7d4000000000000000000000000000000000000000000008c4a326c3490a1100000",
          "contractAddress": "",
          "cumulativeGasUsed": "8079839",
          "gasUsed": "57156",
          "confirmations": "1061330",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923760",
          "timeStamp": "1654647556",
          "hash": "0x732edb664ac7e29c61035ae3ee361b1691136682b003eb12a79e50c64fa0305e",
          "nonce": "40",
          "blockHash": "0x3d0316f8146aed820d04fb699aaa9e95a1973732a191d8c69f6670622541742e",
          "transactionIndex": "53",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "95489386448",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb00000000000000000000000097c5da137889f2912f2d610171c82faed45f0900000000000000000000000000000000000000000000002ec366241137eece5000",
          "contractAddress": "",
          "cumulativeGasUsed": "4096914",
          "gasUsed": "57156",
          "confirmations": "1061324",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923766",
          "timeStamp": "1654647643",
          "hash": "0x08e8cc23a99d9176ccb98b20b5ba587c8b3be5248fe98a97d7960226dfe12869",
          "nonce": "43",
          "blockHash": "0x67ad1d67fb32c8cd3ae3e51deae6a7b5b637fc92b0aa649c0cb6bffede028f85",
          "transactionIndex": "18",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "87602723039",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb000000000000000000000000a630b066413f143567b79b6a9ad62da70e3007fa000000000000000000000000000000000000000000082c774cff95c304da2000",
          "contractAddress": "",
          "cumulativeGasUsed": "2121337",
          "gasUsed": "57180",
          "confirmations": "1061318",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923772",
          "timeStamp": "1654647764",
          "hash": "0x5908f7e5e4cfe7a94c6f81636eeba8be80bcd3df6c839470b548ae8f569f26c7",
          "nonce": "46",
          "blockHash": "0x2aced7162c1ebccce46aab592d34ecd532a9c40eef209a65ff0c087a54d8b84f",
          "transactionIndex": "27",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "110962867587",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb0000000000000000000000009cc947d8f65a092161f72cb7fea52c5e576a31c6000000000000000000000000000000000000000000017dbbc78ff80fb08bc000",
          "contractAddress": "",
          "cumulativeGasUsed": "3132671",
          "gasUsed": "57180",
          "confirmations": "1061312",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923778",
          "timeStamp": "1654647927",
          "hash": "0x273956f188e92a26e7e39b22f33fd501987230fa774701fd86879ae5d8898b9d",
          "nonce": "49",
          "blockHash": "0x35bfab1c21d83cd3b09b2f3589b2b6173c2ef9ed4f01e62aa15be61d1d72e4d9",
          "transactionIndex": "43",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "121526621276",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb0000000000000000000000002ecccc331181acdc6545685d310215fdd68d161200000000000000000000000000000000000000000000512420b461ae0d1d3000",
          "contractAddress": "",
          "cumulativeGasUsed": "2607657",
          "gasUsed": "57168",
          "confirmations": "1061306",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923781",
          "timeStamp": "1654648009",
          "hash": "0xe0e846212dddeb6a55ca993ab196c3ec1ca9f02461132299fe773c89abb2c529",
          "nonce": "52",
          "blockHash": "0x7979408fe8bbd7d44f3e56db604304dae5190f0e64738bd21fc4f3f39c86a715",
          "transactionIndex": "70",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "128586045391",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb000000000000000000000000a77879e9744fb1d7126bd437aca0ff7fb359c5b3000000000000000000000000000000000000000000002226c3f2e42569cb3000",
          "contractAddress": "",
          "cumulativeGasUsed": "4036501",
          "gasUsed": "57168",
          "confirmations": "1061303",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923788",
          "timeStamp": "1654648107",
          "hash": "0xd48b41c6de82f231d2b005ee40bf319a98c24ce02bad05596cf000d03918f278",
          "nonce": "55",
          "blockHash": "0xee44c9c3f07375038744b1fb1c5c84f57773b15132d64285e79b17c9afaae40f",
          "transactionIndex": "36",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "100591294172",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb000000000000000000000000241bca8cc90dd5b8118da2c1aa29119beecb25c3000000000000000000000000000000000000000000005b97829b7f39b4c20000",
          "contractAddress": "",
          "cumulativeGasUsed": "2540278",
          "gasUsed": "57156",
          "confirmations": "1061296",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923793",
          "timeStamp": "1654648219",
          "hash": "0x45292a4c4833ce091aa7c8c0f43330dae4e3de7e02b09709f0361f94f8686f87",
          "nonce": "58",
          "blockHash": "0x2c984921e4a292e8c9ba93693d0c5db6adc8bce4899d7fc769a784e33e3e660b",
          "transactionIndex": "104",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "104246375818",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb0000000000000000000000003f0e648daed617c372b87c621b88f7e2be321794000000000000000000000000000000000000000000002b6dc18a86095f1c6000",
          "contractAddress": "",
          "cumulativeGasUsed": "4696309",
          "gasUsed": "57168",
          "confirmations": "1061291",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        },
        {
          "blockNumber": "14923798",
          "timeStamp": "1654648285",
          "hash": "0xb56d7c7d5d4a79534828d07149ca79f798aeb379d139a7ab1e3990bda10996d9",
          "nonce": "61",
          "blockHash": "0x65fa8282da4d7a78e3969f39ac60e754b5253fce3753540be68c953ff249d9db",
          "transactionIndex": "31",
          "from": "0x9aa99c23f67c81701c772b106b4f83f6e858dd2e",
          "to": "0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc",
          "value": "0",
          "gas": "6000000",
          "gasPrice": "88910817978",
          "isError": "0",
          "txreceipt_status": "1",
          "input": "0xa9059cbb000000000000000000000000c465e19c7e1dfa9dc6d898113cb1399a0a883a390000000000000000000000000000000000000000000225434c1479da9ba31000",
          "contractAddress": "",
          "cumulativeGasUsed": "1609286",
          "gasUsed": "57180",
          "confirmations": "1061286",
          "methodId": "0xa9059cbb",
          "functionName": "transfer(address _to, uint256 _value)"
        }
      ],
      "nextPage": {
        "size": 1000,
        "number": 3
      }
    },

  }
}