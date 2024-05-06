import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import Dropdown from ".";
import DropdownItem from "./DropdownItem";

export default {
  title: "Component/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: Story<ComponentProps<typeof Dropdown>> = (args) => (
  <div className="flex justify-end">
    <Dropdown {...args} />
  </div>
);

export const Default = Template.bind({});
Default.storyName = "Dropdown";
Default.args = {
  label: "Dropdown",
  children: (
    <>
      <DropdownItem href="#">Item 1</DropdownItem>
      <DropdownItem href="#">Item 1</DropdownItem>
      <DropdownItem href="#">Item 1</DropdownItem>
      <DropdownItem href="#">Item 1</DropdownItem>
      <DropdownItem href="#">Item 1</DropdownItem>
      <DropdownItem href="#">Item 1</DropdownItem>
    </>
  ),
};
