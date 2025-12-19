-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "basePrice" SET DEFAULT 0.0,
ALTER COLUMN "specifications" SET DEFAULT '{}',
ALTER COLUMN "title" SET DEFAULT 'Untitled Product';
