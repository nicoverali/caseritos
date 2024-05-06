import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import LatestProducts from ".";
import WithContainer from "components/AppContainer/storybook/WithContainer";
import { Product } from "services/ProductService";

export default {
  title: "Section/Home/LatestProducts",
  component: LatestProducts,
} as ComponentMeta<typeof LatestProducts>;

const testProduct: Product = {
  owner: {
    id: 1,
    storeName: "The Bakery",
  },
  name: "Copa de chocolate delicioso",
  price: 800,
  description: "dadwmkladm",
  createdAt: new Date(),
  id: 3,
  stock: 40,
  pictureUrl:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80",
};

const Template: Story<ComponentProps<typeof LatestProducts>> = (args) => (
  <LatestProducts {...args} />
);

export const Default = Template.bind({});
Default.storyName = "LatestProducts";
Default.args = {
  products: Array(10).fill(testProduct),
};

export const InContainer = WithContainer(Template);
InContainer.args = {
  products: Array(10).fill(testProduct),
};
