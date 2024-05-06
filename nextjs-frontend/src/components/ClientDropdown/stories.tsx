import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import ClientDropdown from ".";

export default {
  title: "Component/ClientDropdown",
  component: ClientDropdown,
  argTypes: { onLogout: { action: "logged out" } },
} as ComponentMeta<typeof ClientDropdown>;

const Template: Story<ComponentProps<typeof ClientDropdown>> = (args) => (
  <div className="flex justify-end">
    <ClientDropdown {...args} />
  </div>
);

export const Default = Template.bind({});
Default.storyName = "ClientDropdown";
Default.args = {
  clientName: "Fake name",
};
