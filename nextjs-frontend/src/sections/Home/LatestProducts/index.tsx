import Action from "components/Action";
import ArrowedText from "components/ArrowedText";
import ProductCard from "components/ProductCard";
import Link from "next/link";
import React from "react";
import { Product } from "services/ProductService";

interface LatestProductsProps {
  products: Product[];
  className?: string;
}
function LatestProducts({ products, className }: LatestProductsProps) {
  return (
    <div className={className}>
      <div className="flex justify-between mb-16">
        <p className="text-xl font-medium">Las últimas comidas</p>
        <Link href="/products" passHref>
          <Action className="flex group outline-none focus-visible:px-4 focus-visible:ring ring-black">
            <ArrowedText
              label="Ver todas"
              classes={{
                arrow:
                  "group-hover:animation-bounce-x group-focus:animation-bounce-x",
                label:
                  "transition-all group-hover:mr-4 group-hover:underline group-focus:mr-4 group-focus:underline",
              }}
            />
          </Action>
        </Link>
      </div>
      <div className="grid gap-16 grid-cols-3 xl:grid-cols-5">
        {products.slice(0, 5).map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} passHref>
            <Action className="group outline-none">
              <ProductCard cta="Ver producto" product={p} />
            </Action>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;
