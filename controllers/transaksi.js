const { PrismaClient } = require("@prisma/client");
const { response, validation } = require("../views/response");
const prisma = new PrismaClient();

const create = async (req, res, next) => {
  const { id_customer, detail } = req.body
  try {
    let totalHarga = 0 
    await Promise.all(
    detail.map(async (data) => {
      const produk = await prisma.produk.findFirst({
        where: {
          id: Number(data.id_produk)
        }
      })
      totalHarga = data.jumlah * produk.harga
    })
  )

  let stock = 0
  await Promise.all(
    detail.map(async (data) => {
      const stok = await prisma.produk.findFirst({
        where: {
          id: Number(data.id_produk)
        }
      })
      if(stock === 0) {
        return stock = 0
      }
      stock = stok.stock - data.jumlah
    })
  )

  const find = await prisma.produk.findFirst({
    where: {
      id: detail.id_produk
    }
  })

  
  await Promise.all(
    detail.map(async (data) => {
      await prisma.produk.update({
        where: {
          id: Number(data.id_produk)
        },
        data: {
          stock: stock
        }
      })
    })
  )

    
    if(find.stock <= 0) {
      return validation(404, 'Stock tidak sudah habis', res)
    }
    const result = await prisma.transaksi.create({
      data: {
        id_customer,
        total_harga: totalHarga,
        detail: {
          createMany: {
            data: detail
          }
        }
      }
    })
    response(201, result, 'Data berhasil ditambahkan', res)
  } catch (error) {
   next(error) 
  }
}

const getAll = async (req, res, next) => {
  try {
    const result = await prisma.transaksi.findMany({
      include: {
       customer: true,
       detail: {
        include: {
          produk: true
        }
       }
      }
    })
    response(200, result, 'Data berhasil ditampilkan', res)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const find = await prisma.transaksi.findFirst({
      where: {
        id: Number(id)
      }
    })
    if(!find) {
      return validation(404, 'Data yang anda cari tidak ada', res)
    }
    const result = await prisma.transaksi.findFirst({
      where: {
        id: Number(id)
      },
      include: {
       customer: true,
       detail: {
        include: {
          produk: true
        }
       }
      }
    })
    response(200, result, 'Data berhasil ditampilkan', res)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  const { id_customer, detail } = req.body
  const { id } = req.params
  let total, stok
  try {
    const find = await prisma.transaksi.findFirst({
      where: {
        id: Number(id)
      }
    })
    if(!find) {
      return validation(404, 'Data yang anda ubah tidak ada', res)
    }

  const dataLama = await prisma.transaksi.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      detail: true
    }
  })

    await Promise.all(
      detail.map(async (data) => {
        const produk = await prisma.produk.findFirst({
          where: {
            id: Number(data.id_produk)
          }
        })
        total = data.jumlah * produk.harga + dataLama.total_harga
        dataLama.detail.map(async (dat) => {
        stok = data.jumlah < dat.jumlah ? dat.jumlah - data.jumlah + produk.stock : produk.stock - data.jumlah
        })
        await prisma.produk.update({
          where: {
            id: Number(data.id_produk)
          },
          data: {
            stock: stok
          }
        })
      })
    )

    const result = await prisma.transaksi.update({
      where: {
        id: Number(id),
      },
      data: {
        id_customer,
        total_harga: total,
        detail: {
         deleteMany: {
          id_transaksi: Number(id)
         },
         createMany: {
          data: detail
         }
        }
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
    const find = await prisma.transaksi.findFirst({
      where: {
        id: Number(id)
      }
    })
    if(!find) {
      return validation(404, 'Data yang anda hapus tidak ada', res)
    }
    const result = await prisma.transaksi.delete({
      where: {
        id: Number(id)
      }
    })
    response(200, result, 'Data berhasil dihapus', res)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy
}