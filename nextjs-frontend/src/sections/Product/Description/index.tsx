import clsx from "clsx";
import Button from "components/Button";
import Counter from "components/Counter";
import LoadingButton from "components/LoadingButton";
import MessageBox from "components/MessageBox";
import Message from "components/MessageBox/Message";
import { ClientSessionContext } from "context/ClientSessionProvider";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import NumberFormat from "react-number-format";
import { OutOfStockError } from "services/apiErrors";
import OrderService from "services/OrderService";
import { Product } from "services/ProductService";

interface ProductDescriptionProps {
  product: Product;
  className?: string;
}

function ProductDescription({ product, className }: ProductDescriptionProps) {
  const { token } = useContext(ClientSessionContext);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [buying, setBuying] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    if (!token) {
      router.push(`/login?redirectUrl=/products/${product.id}`, "/login");
      return;
    }

    setUnexpectedError(false);
    setBuying(true);
    try {
      await OrderService.place(product.id, quantity, token);
      setBuying(false);
      setOrderComplete(true);
      setTimeout(() => {
        router.push("/orders");
      }, 1000);
    } catch (err) {
      setBuying(false);
      setUnexpectedError(true);
    }
  };

  return (
    <div className={clsx("flex flex-col max-w-xl", className)}>
      <div className={clsx("flex flex-col w-full p-6 border-2 border-black")}>
        <p>{product.description}</p>
        <NumberFormat
          className="py-6 font-medium text-4xl"
          value={product.price}
          prefix="$"
          thousandSeparator="."
          decimalSeparator=","
          displayType="text"
        />
        <div className="flex items-end">
          <LoadingButton
            style="primary"
            className="mr-6"
            onClick={handleBuy}
            loading={buying}
          >
            Comprar
          </LoadingButton>
          <div>
            <p className="text-center opacity-80 text-sm">
              stock: {product.stock}
            </p>
            <Counter
              className="w-48"
              input={{
                label: "quantity",
                name: "quantity",
                min: 1,
                max: product.stock,
                onChange: setQuantity,
              }}
            />
          </div>
        </div>
      </div>
      <MessageBox style="success" className="mt-4">
        <Message show={orderComplete}>¡ Orden completada !</Message>
        <Message show={unexpectedError} style="error">
          ¡ Lo sentimos ! Ocurrió un error, por favor volvelo a intentar más
          tarde
        </Message>
      </MessageBox>
    </div>
  );
}

export default ProductDescription;
