import AppContainer from "components/AppContainer";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import BigTitle from "sections/BigTitle";
import ProductDescription from "sections/Product/Description";
import DefaultHeader from "sections/DefaultHeader";
import Footer from "sections/Footer";
import { NotFoundError } from "services/apiErrors";
import ProductService, { Product } from "services/ProductService";

interface ProductPageProps {
  product: Product;
}

function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <DefaultHeader />

      <AppContainer className="flex flex-col min-h-[calc(100vh-80px)]">
        <BigTitle>{product.name}</BigTitle>
        <section className="flex items-start mb-12 flex-wrap lg:flex-nowrap justify-end">
          <div className="w-full h-[40vh] lg:h-[60vh] relative bg-gray-50">
            <Image
              priority
              unoptimized
              alt={product.name}
              src={product.pictureUrl}
              layout="fill"
              objectFit="contain"
              objectPosition="center 40%"
            />
          </div>
          <ProductDescription
            {...{ product }}
            className="mt-4 lg:mt-0 lg:ml-12"
          />
        </section>
        <Footer className="mt-auto" />
      </AppContainer>
    </>
  );
}

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const product = await ProductService.get(Number(query.id));
    return { props: { product } };
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { notFound: true };
    }
    throw err;
  }
};
