const router = require('express').Router();
const transaksi = require('../controllers/transaksi');

router.post('/transaksi', transaksi.create);
router.get('/transaksi', transaksi.getAll);
router.get('/transaksi/:id', transaksi.getById);
router.put('/transaksi/:id', transaksi.update);
router.delete('/transaksi/:id', transaksi.destroy);

module.exports = router