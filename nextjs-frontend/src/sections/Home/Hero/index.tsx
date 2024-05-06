import Button from "components/Button";
import Link from "next/link";
import React from "react";

export default function HomeHero() {
  return (
    <div className="w-3/4 2xl:w-1/2 pt-20 pb-24">
      <h1 className="font-display text-7xl">
        Pedi comida <span className="font-handwrite">casera</span> hecha con{" "}
        <span className="font-handwrite text-primary">amor</span>
      </h1>
      <p className="font-medium text-2xl mt-4">
        Explora la variedad de comidas que ofrecen nuestros vendedores, todas
        echas en casa
      </p>
      <Link href="/products" passHref>
        <Button className="mt-12" style="primary">
          Explorar comidas
        </Button>
      </Link>
    </div>
  );
}
