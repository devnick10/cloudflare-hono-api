-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_autherId_fkey";

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
