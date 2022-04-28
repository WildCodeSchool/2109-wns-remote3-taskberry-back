/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `estimateEndAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `name` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `createdAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Media` ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `type` VARCHAR(25) NOT NULL,
    MODIFY `url` VARCHAR(300) NOT NULL,
    MODIFY `createdAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL,
    MODIFY `estimateEndAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL;
