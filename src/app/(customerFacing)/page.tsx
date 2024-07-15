import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        productsFetcher={getMostPopularProducts}
        title="Most popular"
      />
      <ProductGridSection productsFetcher={getNewestProducts} title="Newest" />
    </main>
  );
}

function getNewestProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

function getMostPopularProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

const ProductGridSection = async ({
  productsFetcher,
  title,
}: ProductGridSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h3 className="text-3xl font-bold">{title}</h3>
        <Button asChild variant="outline">
          <Link href="products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
};

const ProductSuspense = async ({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) => {
  return (await productsFetcher()).map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      description={product.description}
      imagePath={product.imagePath}
      name={product.name}
      price={product.price}
    />
  ));
};
