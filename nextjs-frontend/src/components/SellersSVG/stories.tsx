import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import SellersSVG from ".";

export default {
  title: "Component/SellersSVG",
  component: SellersSVG,
} as ComponentMeta<typeof SellersSVG>;

const Template: Story<ComponentProps<typeof SellersSVG>> = (args) => (
  <SellersSVG />
);

export const Default = Template.bind({});
Default.storyName = "SellersSVG";
