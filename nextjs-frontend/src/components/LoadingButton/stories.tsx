import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import LoadingButton from ".";

export default {
  title: "Input/LoadingButton",
  component: LoadingButton,
} as ComponentMeta<typeof LoadingButton>;

const Template: Story<ComponentProps<typeof LoadingButton>> = (args) => (
  <LoadingButton {...args} />
);

export const PrimaryStyle = Template.bind({});
PrimaryStyle.args = {
  style: "primary",
  children: "LoadingButton",
  loading: true,
};

export const SecondaryStyle = Template.bind({});
SecondaryStyle.args = {
  style: "secondary",
  children: "LoadingButton",
  loading: true,
};

export const DefaultStyle = Template.bind({});
DefaultStyle.args = {
  children: "LoadingButton",
  style: "default",
  loading: true,
};
DefaultStyle.parameters = {
  backgrounds: { default: "dark" },
};

export const NegativeStyle = Template.bind({});
NegativeStyle.args = {
  children: "LoadingButton",
  style: "negative",
  loading: true,
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  style: "primary",
  size: "sm",
  children: "LoadingButton",
  loading: true,
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  style: "primary",
  size: "md",
  children: "LoadingButton",
  loading: true,
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  style: "primary",
  size: "lg",
  children: "LoadingButton",
  loading: true,
};

export const AsLink = Template.bind({});
AsLink.args = {
  style: "primary",
  href: "#",
  children: "LoadingButton",
  loading: true,
};
