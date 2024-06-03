/*
  Warnings:

  - You are about to drop the column `address` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactionproduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alamat` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kelamin` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `umur` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionproduct` DROP FOREIGN KEY `TransactionProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionproduct` DROP FOREIGN KEY `TransactionProduct_transactionId_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `address`,
    DROP COLUMN `age`,
    DROP COLUMN `gender`,
    DROP COLUMN `name`,
    ADD COLUMN `alamat` VARCHAR(100) NOT NULL,
    ADD COLUMN `jenis_kelamin` VARCHAR(100) NOT NULL,
    ADD COLUMN `nama` VARCHAR(100) NOT NULL,
    ADD COLUMN `umur` INTEGER NOT NULL;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `transaction`;

-- DropTable
DROP TABLE `transactionproduct`;

-- CreateTable
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_customer` INTEGER NOT NULL,
    `total_harga` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailTransaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_transaksi` INTEGER NOT NULL,
    `id_produk` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaksi` ADD CONSTRAINT `DetailTransaksi_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `Transaksi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaksi` ADD CONSTRAINT `DetailTransaksi_id_produk_fkey` FOREIGN KEY (`id_produk`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
