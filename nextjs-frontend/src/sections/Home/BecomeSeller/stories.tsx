import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import BecomeSeller from ".";
import AppContainer from "components/AppContainer";
import WithContainer from "components/AppContainer/storybook/WithContainer";

export default {
  title: "Section/Home/BecomeSeller",
  component: BecomeSeller,
} as ComponentMeta<typeof BecomeSeller>;

const Template: Story<ComponentProps<typeof BecomeSeller>> = (args) => (
  <BecomeSeller />
);

export const Default = Template.bind({});
Default.storyName = "BecomeSeller";

export const InContainer = WithContainer(Template);
