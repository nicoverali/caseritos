import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import SquareButton from ".";

export default {
  title: "Input/SquareButton",
  component: SquareButton,
} as ComponentMeta<typeof SquareButton>;

const Template: Story<ComponentProps<typeof SquareButton>> = (args) => (
  <SquareButton {...args}>
    <BadgeCheckIcon className="w-6" />
  </SquareButton>
);

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: "dark",
  },
};

export const Primary = Template.bind({});
Primary.args = {
  style: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  style: "secondary",
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  size: "sm",
  style: "primary",
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  size: "md",
  style: "primary",
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  size: "lg",
  style: "primary",
};
