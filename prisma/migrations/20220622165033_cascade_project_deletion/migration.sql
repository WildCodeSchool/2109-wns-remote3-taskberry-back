/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `estimateEndAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `Media` DROP FOREIGN KEY `Media_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_projectId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `createdAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Media` MODIFY `createdAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL,
    MODIFY `estimateEndAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
