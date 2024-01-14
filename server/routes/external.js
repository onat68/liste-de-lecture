const express = require('express')
const router = express.Router()
const externalCtrl = require('../controllers/external')

router.get('/find/Album/:query', externalCtrl.findAlbum)
router.get('/find/Book/:query', externalCtrl.findBook)
router.get('/find/Movie/:query', externalCtrl.findMovie)

module.exports = router
