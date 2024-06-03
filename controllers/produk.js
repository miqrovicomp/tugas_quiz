const { PrismaClient } = require("@prisma/client");
const { response, validation } = require("../views/response");
const prisma = new PrismaClient();

const sisaStok = async (req, res, next) => {
    try {
        const find = await prisma.produk.findMany();
        const result = find.filter(data => data.stock < 5);
        
        response(200, result, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error);
    }
}

const produkFavorit = async (req, res, next) => {
    try {
        const produk = await prisma.produk.findMany({
            include: {
                detail: true
            }
        })
        const result = produk.map(data => {
            const frekuensi = data.detail.length
            const total = data.detail.reduce((acc, cur) => acc + (cur.jumlah * data.harga),0)
            return {
                nama: data.nama,
                frekuensi,
                total: total
            }
            
        })
       response(200, result, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await prisma.produk.findMany()
        !result ? validation(404, 'Data masih kosong', res) : response(200, result, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await prisma.produk.findFirst({
            where: {
                id: Number(id)
            }
        })
        !result ? validation(404, 'Data yang anda cari tidak ada', res) : response(200, result, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    const { nama, harga, stock } = req.body
    try {
        if(!nama || !harga || !stock) {
            return validation(404, 'Silahkan isi data yang masih kosong', res)
        }
        const find = await prisma.produk.findFirst({
            where: {
                nama: nama
            }
        })
        if(find) {
            return validation(404, 'Data sudah ada', res)
        }
        const result = await prisma.produk.create({
           data: {
            nama,
            harga,
            stock
           }
        })
        response(201, result, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    const { nama, harga, stock } = req.body
    const { id } = req.params
    try {
        if(!nama || !harga || !stock) {
            return validation(404, 'Silahkan isi data yang masih kosong', res)
        }
        const find = await prisma.produk.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!find) {
            validation(404, 'Data yang anda ubah tidak ada', res)
        }
        const result = await prisma.produk.update({
            where: {
                id: Number(id)
            },
            data: {
                nama,
                harga,
                stock
            }
        })
        response(201, result, 'Data berhasil diubah', res)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    const { id } = req.params
    try {
        const find = await prisma.produk.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!find) {
            validation(404, 'Data yang anda hapus tidak ada', res)
        }
        const result = await prisma.produk.delete({
            where: {
                id: Number(id)
            }
        })
        response(200, result, 'Data berhasil dihapus', res)
    } catch (error) {
        
    }
}

module.exports = {
    sisaStok,
    produkFavorit,
    getAll,
    getById,
    create,
    update,
    destroy
}