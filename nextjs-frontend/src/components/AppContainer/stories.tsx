import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import AppContainer from ".";

export default {
  title: "Component/AppContainer",
  component: AppContainer,
} as ComponentMeta<typeof AppContainer>;

const Template: Story<ComponentProps<typeof AppContainer>> = (args) => (
  <AppContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  className: "bg-primary h-96 flex items-center",
  children: <h1 className="block m-auto font-medium text-5xl">Content</h1>,
};
Default.storyName = "AppContainer";
