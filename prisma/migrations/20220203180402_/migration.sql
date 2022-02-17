/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `estimateEndAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `name` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Ticket` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `finishedAt` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersInProjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UsersInProjects` DROP FOREIGN KEY `UsersInProjects_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersInProjects` DROP FOREIGN KEY `UsersInProjects_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `UsersInProjects` DROP FOREIGN KEY `UsersInProjects_userId_fkey`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(50) NOT NULL,
    MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL,
    MODIFY `estimateEndAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `Status` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(50) NOT NULL,
    MODIFY `createdAt` TIMESTAMP NOT NULL,
    MODIFY `finishedAt` TIMESTAMP NULL;

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `UsersInProjects`;

-- CreateTable
CREATE TABLE `UsersOnProjects` (
    `userId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,
    `role` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`userId`, `projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersOnProjects` ADD CONSTRAINT `UsersOnProjects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnProjects` ADD CONSTRAINT `UsersOnProjects_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
