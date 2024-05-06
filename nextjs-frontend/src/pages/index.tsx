/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Image from "next/image";
import React from "react";
import AppContainer from "components/AppContainer";
import LatestProducts from "sections/Home/LatestProducts";
import BecomeSeller from "sections/Home/BecomeSeller";
import Footer from "sections/Footer";
import ProductService, { Product } from "services/ProductService";
import { GetServerSideProps } from "next";
import HomeHero from "sections/Home/Hero";
import HomeHeader from "sections/Home/Header";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Playfair+Display:wght@900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="w-full relative">
        <Image
          priority
          unoptimized
          className="z-0>"
          src="/images/home_hero.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="center 20%"
          alt="hero-image"
        />
        <HomeHeader />

        <AppContainer className="z-10 relative">
          <HomeHero />
        </AppContainer>
      </div>
      <AppContainer>
        <LatestProducts className="mt-24" products={products} />
        <BecomeSeller className="mt-72" />
        <Footer className="mt-40" />
      </AppContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const products = await ProductService.getPage(0, 10);
  return { props: { products } };
};
