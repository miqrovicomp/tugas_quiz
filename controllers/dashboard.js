const { PrismaClient } = require("@prisma/client");
const { response, validation } = require("../views/response");
const prisma = new PrismaClient();

const dashboard = async (req, res, next) => {
    try {
        const totalPembelian = await prisma.transaksi.findMany()
        const total = totalPembelian.reduce((acc, cur) => acc + cur.total_harga, 0)
        const totalProduk = await prisma.produk.count()
        const totalCustomer = await prisma.customer.count()
        const cekStockKurang = await prisma.produk.count({
            where: {
                stock: {
                    lt: 5
                }
            }
        })
        const produk = await prisma.produk.findMany({
            include: {
                detail: true
            }
        })
        const produkFavorit = produk.map(data => {
            const frekuensi = data.detail.length
            const total = data.detail.reduce((acc, cur) => acc + (cur.jumlah * data.harga),0)
            return {
                nama: data.nama,
                frekuensi,
                total: total
            }
            
        })

        const data = {
            total,
            totalProduk,
            totalCustomer,
            cekStockKurang,
            produkFavorit
        }
        response(200, data, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error)
    }
}

module.exports = {dashboard}