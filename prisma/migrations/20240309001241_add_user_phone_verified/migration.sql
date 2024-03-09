-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "thumbnail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneVerified" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "_FavouritedBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavouritedBy_AB_unique" ON "_FavouritedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouritedBy_B_index" ON "_FavouritedBy"("B");

-- AddForeignKey
ALTER TABLE "_FavouritedBy" ADD CONSTRAINT "_FavouritedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritedBy" ADD CONSTRAINT "_FavouritedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
