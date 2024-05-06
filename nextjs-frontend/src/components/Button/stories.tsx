import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import Button from ".";

export default {
  title: "Input/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const PrimaryStyle = Template.bind({});
PrimaryStyle.args = {
  style: "primary",
  children: "Button",
};

export const SecondaryStyle = Template.bind({});
SecondaryStyle.args = {
  style: "secondary",
  children: "Button",
};

export const DefaultStyle = Template.bind({});
DefaultStyle.args = {
  children: "Button",
  style: "default",
};
DefaultStyle.parameters = {
  backgrounds: { default: "dark" },
};

export const NegativeStyle = Template.bind({});
NegativeStyle.args = {
  children: "Button",
  style: "negative",
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  style: "primary",
  size: "sm",
  children: "Button",
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  style: "primary",
  size: "md",
  children: "Button",
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  style: "primary",
  size: "lg",
  children: "Button",
};

export const AsLink = Template.bind({});
AsLink.args = {
  style: "primary",
  href: "#",
  children: "Button",
};
