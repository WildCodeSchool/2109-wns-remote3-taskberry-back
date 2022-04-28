/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `userId` on the `Media` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `estimateEndAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_userId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `createdAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Media` DROP COLUMN `userId`,
    MODIFY `createdAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL,
    MODIFY `estimateEndAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL;
