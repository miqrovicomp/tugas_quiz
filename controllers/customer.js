const { PrismaClient } = require("@prisma/client");
const { response, validation } = require("../views/response");;
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    const { nama, alamat, jenis_kelamin, umur } = req.body
    try {
        if(!nama || !alamat || !jenis_kelamin || !umur) {
            validation(404, 'Silahkan isi data yang masih kosong', res)
        }
        const result = await prisma.customer.create({
            data: {
                nama,
                alamat,
                jenis_kelamin,
                umur
            }
        })
        response(201, result, 'Data berhasil ditambahkan', res)
    } catch (error) {
        next
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await prisma.customer.findMany()
        return !cekData ? validation(404, 'Data masih kosong', res) : response(200, result, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
   const { id } = req.params
   try {
    const result = await prisma.customer.findFirst({
        where: {
            id: Number(id)
        }
    })
    return !result ? validation(404, 'Data tidak ditemukan', res) : response(200, result, 'Data berhasil ditampilkan', res)
   } catch (error) {
    next(error)
   } 
}

const update = async (req, res, next) => {
    const { nama, alamat, jenis_kelamin, umur } = req.body
    const { id } = req.params
    try {
        if(!nama || !alamat || !jenis_kelamin || !umur) {
            validation(404, 'Silahkan isi data yang masih kosong', res)
        }
        const result = await prisma.customer.update({
            where: {
                id: Number(id)
            },
            data: {
                nama,
                alamat,
                jenis_kelamin,
                umur
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
        const result = await prisma.customer.delete({
            where: {
                id: Number(id)
            }
        })
        response(200, result, 'Data berhasil dihapus', res)
    } catch (error) {
        next(error)
    }
}

const totalPembelian = async (req, res, next) => {
    try {
        const find = await prisma.customer.findMany({
            include: {
                transaksi: true
            }
        })
        const result = find.map(data => {
            const total = data.transaksi.reduce((acc, cur) => acc + cur.total_harga, 0)
            return {
                nama: data.nama,
                total: total 
            }
        })
        response(200, result, 'Data berhasil ditampilkan', res)
    } catch (error) {
        next(error)
    }
}

const umur = async (req, res, next) => {
    try {
        const find = await prisma.customer.findMany({
            select: {
                umur: true
            }
        })
        const result = find.reduce((acc, cur) => acc + cur.umur, 0)
        const rata = find.length > 0 ? result / find.length : 0
        response(200, rata, 'Data berhasil ditampillkan', res)
    } catch (error) {
        next(error)
    }
}

const jenisKelamin = async (req, res, next) => {
    try {
        const find = await prisma.customer.groupBy({
            by: ['jenis_kelamin'],
            _count: {
                jenis_kelamin: true
            },
            orderBy: {
                _count: {
                    jenis_kelamin: 'desc'
                }
            }
        })
        const result = find[0]
       res.json({
        data: {
            jenis_kelamin: result.jenis_kelamin,
            frekuensi: result._count.jenis_kelamin
        }
       })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    totalPembelian,
    umur,
    jenisKelamin,
    getAll,
    getById,
    create,
    update,
    destroy
}