import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import TextInput from ".";

export default {
  title: "Input/TextInput",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: Story<ComponentProps<typeof TextInput>> = (args) => (
  <TextInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "test-input",
  label: "Label",
};

export const Password = Template.bind({});
Password.args = {
  name: "test-input",
  label: "Label",
  type: "password",
};

export const Numbers = Template.bind({});
Numbers.args = {
  name: "test-input",
  label: "Label",
  type: "number",
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  name: "test-input",
  label: "Label",
  placeholder: "Enter some text...",
  size: "sm",
};

export const MediumSize = Template.bind({});
MediumSize.args = {
  name: "test-input",
  label: "Label",
  placeholder: "Enter some text...",
  size: "md",
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  name: "test-input",
  label: "Label",
  placeholder: "Enter some text...",
  size: "lg",
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  name: "test-input",
  label: "Label",
  placeholder: "Enter some text...",
};

export const WithError = Template.bind({});
WithError.args = {
  name: "test-input",
  label: "Label",
  value: "invalid input",
  error: "An error occurred",
};

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
  name: "test-input",
  label: "Label",
  hideLabel: true,
  placeholder: "Enter some text...",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  name: "test-input",
  label: "Label",
  placeholder: "Enter some text...",
  width: "w-full",
};

export const LogOnType = Template.bind({});
LogOnType.args = {
  name: "test-input",
  label: "Label",
  placeholder: "Logs everything you type...",
  onType: console.log,
};
