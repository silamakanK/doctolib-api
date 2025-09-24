/*
  Warnings:

  - You are about to drop the column `specialty` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Speciality" AS ENUM ('GENERALISTE', 'DERMATOLOGUE', 'PEDIATRE', 'GYNECOLOGUE', 'CARDIOLOGUE', 'OPHTALMOLOGUE', 'AUTRE');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "specialty",
ADD COLUMN     "speciality" "public"."Speciality";

-- DropEnum
DROP TYPE "public"."Specialty";
