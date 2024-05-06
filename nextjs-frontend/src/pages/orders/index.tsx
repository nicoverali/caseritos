import AppContainer from "components/AppContainer";
import OrderCard from "components/OrderCard";
import { ClientSessionContext } from "context/ClientSessionProvider";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import BigTitle from "sections/BigTitle";
import DefaultHeader from "sections/DefaultHeader";
import Footer from "sections/Footer";
import OrderService, { Order } from "services/OrderService";
import LoadingSplashScreen from "components/LoadingSplashScreen";
import Image from "next/image";
import Action from "components/Action";
import Link from "next/link";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const { token } = useContext(ClientSessionContext);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      OrderService.getAll(token).then(setOrders);
    } else if (token === null) {
      router.push(`/login?redirectUrl=${router.asPath}`, "/login");
    }
  }, [token, router]);

  if (!orders) {
    return <LoadingSplashScreen />;
  }

  return (
    <>
      <DefaultHeader />
      <AppContainer className="h-[calc(100%-80px)] flex flex-col">
        <BigTitle>Todas mis ordenes</BigTitle>

        {orders.length ? (
          <ul className="mt-16 mb-20 flex flex-col">
            {orders.map((o) => (
              <li key={o.id} className="w-full mb-6 last:mb-0">
                <OrderCard className="w-full" order={o} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-start">
            <Image
              src="/icons/cooking.svg"
              alt="cooking"
              width="256"
              height="256"
            />
            <h2 className="text-2xl max-w-2xl text-center mt-8">
              Todavia no tenes ninguna orden. <br />
              <Link href="/products" passHref>
                <Action className="text-primary font-medium underline hover:text-primary-light">
                  Explora
                </Action>
              </Link>{" "}
              la variedad de comidas disponibles
            </h2>
          </div>
        )}

        <Footer className="w-full mt-auto" />
      </AppContainer>
    </>
  );
}

export default OrdersPage;
