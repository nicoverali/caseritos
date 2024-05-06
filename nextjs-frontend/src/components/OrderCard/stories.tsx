import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import OrderCard from ".";
import { Order } from "services/OrderService";

export default {
  title: "Component/OrderCard",
  component: OrderCard,
} as ComponentMeta<typeof OrderCard>;

const Template: Story<ComponentProps<typeof OrderCard>> = (args) => (
  <OrderCard {...args} />
);

const testOrder: Order = {
  id: 1,
  createdAt: new Date(),
  quantity: 2,
  price: 800,
  product: {
    id: 1,
    name: "Copa de chocolate delicionso",
    owner: {
      id: 1,
      storeName: "The bakery",
    },
    pictureUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80",
  },
};

export const Default = Template.bind({});
Default.storyName = "OrderCard";
Default.args = {
  order: testOrder,
};

export const WithLargeName = Template.bind({});
WithLargeName.args = {
  order: {
    ...testOrder,
    product: {
      ...testOrder.product,
      name:
        "A very large name of a product that does not exist but works for this test",
    },
  },
};
