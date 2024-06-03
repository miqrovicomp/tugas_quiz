const router = require('express').Router();
const transaksi = require('./transaksi');
const customer = require('./customer');
const produk = require('./produk');
const dashboard = require('./dashboard');


router.use([transaksi, customer, produk, dashboard]);


module.exports = router