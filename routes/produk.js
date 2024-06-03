const { sisaStok, produkFavorit, create, update, getAll, getById, destroy } = require('../controllers/produk')

const router = require('express').Router()

router.get('/produk-kurang',sisaStok)
router.get('/produk-favorit',produkFavorit)
router.get('/produk',getAll)
router.get('/produk/:id',getById)
router.post('/produk',create)
router.put('/produk/:id',update)
router.delete('/produk/:id',destroy)

module.exports = router