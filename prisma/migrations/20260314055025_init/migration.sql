/*
  Warnings:

  - You are about to drop the column `date` on the `Circular` table. All the data in the column will be lost.
  - You are about to drop the column `address1` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `doj` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `proposedPost` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `recommendationId` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Order` table. All the data in the column will be lost.
  - Added the required column `aadharNumber` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodGroup` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationQualification` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyDetails` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentsAddress` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanentAddress` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event` to the `PhotoGallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Circular" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "area",
DROP COLUMN "city",
DROP COLUMN "district",
DROP COLUMN "doj",
DROP COLUMN "pincode",
DROP COLUMN "proposedPost",
DROP COLUMN "recommendationId",
DROP COLUMN "state",
ADD COLUMN     "aadharNumber" TEXT NOT NULL,
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "educationQualification" TEXT NOT NULL,
ADD COLUMN     "familyDetails" TEXT NOT NULL,
ADD COLUMN     "introducedBy" TEXT,
ADD COLUMN     "parentsAddress" TEXT NOT NULL,
ADD COLUMN     "permanentAddress" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL,
ADD COLUMN     "vehicleNumber" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "PhotoGallery" ADD COLUMN     "event" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "idCardUrl" TEXT,
    "idCardPublicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationDetails" (
    "id" TEXT NOT NULL,
    "upiId" TEXT NOT NULL,
    "qrCodeUrl" TEXT NOT NULL,
    "qrCodePublicId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leadership" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leadership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateNumber_key" ON "Certificate"("certificateNumber");

-- CreateIndex
CREATE INDEX "Certificate_certificateNumber_idx" ON "Certificate"("certificateNumber");
