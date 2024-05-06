import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DefaultHeader from ".";
import {
  ClientSessionContext,
  ClientSessionContextState,
} from "context/ClientSessionProvider";

export default {
  title: "Section/DefaultHeader",
  component: DefaultHeader,
  decorators: [
    (Story) => (
      <div style={{ height: "200vh  " }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof DefaultHeader>;

const login = async () => {
  sessionState.client = {
    id: 1,
    address: "Fake address",
    phone: "+123456789",
    email: "some@fake.email",
    name: "Fake Name",
  };
  sessionState.token = "2ndlk3nd23d";
  sessionState.isLoggedIn = true;
};

const logout = async () => {
  sessionState.client = null;
  sessionState.token = null;
  sessionState.isLoggedIn = false;
};

const sessionState: ClientSessionContextState = {
  token: "d32kldl2k3d",
  isLoggedIn: true,
  client: {
    id: 1,
    address: "Fake address",
    phone: "+123456789",
    email: "some@fake.email",
    name: "Fake Name",
  },
  login: login,
  logout: logout,
};

const Template: Story<ComponentProps<typeof DefaultHeader>> = (args) => (
  <ClientSessionContext.Provider value={sessionState}>
    <DefaultHeader />
  </ClientSessionContext.Provider>
);

export const Default = Template.bind({});
Default.storyName = "DefaultHeader";
