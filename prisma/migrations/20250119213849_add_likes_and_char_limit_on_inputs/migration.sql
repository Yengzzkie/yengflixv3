/*
  Warnings:

  - You are about to alter the column `content` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "content" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" VARCHAR(100) NOT NULL,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(500);

-- CreateTable
CREATE TABLE "_Liker" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Liker_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Liker_B_index" ON "_Liker"("B");

-- AddForeignKey
ALTER TABLE "_Liker" ADD CONSTRAINT "_Liker_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Liker" ADD CONSTRAINT "_Liker_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
