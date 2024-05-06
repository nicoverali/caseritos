import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import ArrowedText from ".";

export default {
  title: "Input/ArrowedText",
  component: ArrowedText,
} as ComponentMeta<typeof ArrowedText>;

const Template: Story<ComponentProps<typeof ArrowedText>> = (args) => (
  <ArrowedText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "ArrowedText",
};

export const NarrowArrow = Template.bind({});
NarrowArrow.args = {
  label: "ArrowedText",
  arrowSize: "narrow",
};
