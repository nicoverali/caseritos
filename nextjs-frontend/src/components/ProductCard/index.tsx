import React from "react";
import NumberFormat from "react-number-format";
import ArrowedText from "components/ArrowedText";
import ProductCardContainer from "./ProductCardContainer";
import SquareImage from "./SquareImage";
import { Product } from "services/ProductService";

interface ProductProps {
  product: Product;
  cta?: string;
  className?: string;
}

function ProductCard(props: ProductProps) {
  const { owner, name, price, thumbnailUrl, description } = props.product;
  const { cta = "Details" } = props;
  return (
    <ProductCardContainer classNames={props.className}>
      <SquareImage
        unoptimized
        className="bg-gray-50"
        layout="fill"
        src={thumbnailUrl}
        alt={description}
      />
      <div className="text-left w-full group-focus:pl-2 group-hover:pl-2 transition-all ease-bounce-in duration-200">
        <p className="pr-2 h-5 line-clamp-1 text-sm font-light mt-4">
          {owner.storeName}
        </p>
        <p className="pr-2 h-10 leading-5 line-clamp-2 mt-2 overflow-hidden ">
          {name}
        </p>
        <div className="flex justify-between mt-2 mb-4">
          <NumberFormat
            className="font-light"
            value={price}
            prefix="$"
            thousandSeparator="."
            decimalSeparator=","
            displayType="text"
          />
          <ArrowedText
            label={cta}
            arrowSize="narrow"
            classes={{
              container:
                "group-hover:pr-2 group-focus:pr-2 transition-all ease-bounce-in duration-200",
              label:
                "underline mr-0 opacity-0 group-hover:opacity-100 group-hover:mr-2 group-focus:opacity-100 group-focus:mr-2 transition-all ease-bounce-in duration-300",
            }}
          />
        </div>
      </div>
    </ProductCardContainer>
  );
}

export default ProductCard;
