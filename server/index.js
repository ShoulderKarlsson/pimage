const {send} = require('micro')
const {router, get} = require('microrouter')
const fs = require('fs')
const util = require('util')
const path = require('path')
const logging = require('./src/lib/logging.js')

const readDirP = util.promisify(fs.readdir)
const lstatP = util.promisify(fs.lstat)

const getImages = get('/images', async (req, res) => {

  // Not sure if the || [] is ugly?
  // Maybe concider adding check instead
  const imageFolders = await readDirP('./images')
    .catch(error => {
      console.log(error)
      return send(res, 400, JSON.stringify({error: 'Error while trying to read images folder..'}))
    })

  const imageFolderNames = await imageFolders
    .reduce(async (accP, curr) => {
      const acc = await accP
      const fileStat = await lstatP(path.join(__dirname + `/images/${curr}`))
      if (fileStat.isDirectory()) {
        return [...acc, curr]
      } else {
        logging.warning(`Found path that was not a folder, consider moving this. File > ${curr}`)
        return acc
      }
    }, Promise.resolve([]))

  return send(res, 200, JSON.stringify({body: imageFolderNames}))
})



const indexRoute = get('/', (req, res) => {
  return send(res, 200, JSON.stringify({message: 'Hello Micro  world!'}))
})

module.exports = router(getImages)
