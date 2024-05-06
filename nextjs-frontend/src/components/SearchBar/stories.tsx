import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import SearchBar from ".";

export default {
  title: "Input/SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: Story<ComponentProps<typeof SearchBar>> = (args) => (
  <SearchBar {...args} />
);

export const Default = Template.bind({});
Default.storyName = "SearchBar";
Default.args = {
  label: "Search products",
  name: "search-products",
  placeholder: "What would you like to eat ?",
  style: "primary",
  buttonLabel: "Search",
};
