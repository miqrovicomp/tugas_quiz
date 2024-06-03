/*
  Warnings:

  - You are about to drop the column `jenis_kelamin` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `nama_customer` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `id_customer` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `total_pembelian` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the `detail_transaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jenisKelamin` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCustomer` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPembelian` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detail_transaksi` DROP FOREIGN KEY `detail_transaksi_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `detail_transaksi` DROP FOREIGN KEY `detail_transaksi_id_transaksi_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `transaksi_id_customer_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `jenis_kelamin`,
    DROP COLUMN `nama_customer`,
    ADD COLUMN `jenisKelamin` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama` VARCHAR(191) NOT NULL,
    MODIFY `alamat` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaksi` DROP COLUMN `id_customer`,
    DROP COLUMN `total_pembelian`,
    ADD COLUMN `idCustomer` INTEGER NOT NULL,
    ADD COLUMN `totalPembelian` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `detail_transaksi`;

-- DropTable
DROP TABLE `product`;

-- CreateTable
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `stock` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransaksiProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idTransaksi` INTEGER NOT NULL,
    `idProduk` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_idCustomer_fkey` FOREIGN KEY (`idCustomer`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransaksiProduct` ADD CONSTRAINT `TransaksiProduct_idTransaksi_fkey` FOREIGN KEY (`idTransaksi`) REFERENCES `Transaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransaksiProduct` ADD CONSTRAINT `TransaksiProduct_idProduk_fkey` FOREIGN KEY (`idProduk`) REFERENCES `Produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
