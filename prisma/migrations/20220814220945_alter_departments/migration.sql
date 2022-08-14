/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `departments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "departments_description_key" ON "departments"("description");
