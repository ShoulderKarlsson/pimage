// import {send} from 'micro'
// import {router, get} from 'microrouter'
const {send} = require('micro')
const {router, get} = require('microrouter')


const indexRoute = get('/', (req, res) => {
  return send(res, 200, JSON.stringify({message: 'Hello Micro  world!'}))
})

module.exports = router(indexRoute)
