import Action from "components/Action";
import AppContainer from "components/AppContainer";
import ProductCard from "components/ProductCard";
import Link from "next/link";
import React from "react";
import BigTitle from "sections/BigTitle";
import DefaultHeader from "sections/DefaultHeader";
import Footer from "sections/Footer";
import ProductService, { Product } from "services/ProductService";

interface ProductsPageProps {
  products: Product[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  return (
    <>
      <DefaultHeader />
      <AppContainer>
        <BigTitle>Todos los productos</BigTitle>
        <ul className="grid grid-cols-5 gap-6">
          {products.map((v) => (
            <li key={v.id} className="w-full">
              <Link href={`/products/${v.id}`} passHref>
                <Action className="group outline-none">
                  <ProductCard
                    className="w-full"
                    product={v}
                    cta="Ver producto"
                  />
                </Action>
              </Link>
            </li>
          ))}
        </ul>
        <Footer className="mt-10" />
      </AppContainer>
    </>
  );
}

export async function getServerSideProps() {
  const products = await ProductService.getAll();
  return { props: { products } };
}
