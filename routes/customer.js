const { totalPembelian, umur, jenisKelamin, getAll, getById, create, update, destroy } = require('../controllers/customer');
const router = require('express').Router();

router.get('/total-pembelian',totalPembelian)
router.get('/rata-rata-umur',umur)
router.get('/jenis-kelamin',jenisKelamin)
router.get('/customer',getAll)
router.get('/customer/:id',getById)
router.post('/customer',create)
router.put('/customer/:id',update)
router.delete('/customer/:id',destroy)

module.exports = router