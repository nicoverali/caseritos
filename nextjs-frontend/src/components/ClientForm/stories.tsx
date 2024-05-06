import React, { ComponentProps, Fragment } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import ClientForm from ".";
import WithContainer from "components/AppContainer/storybook/WithContainer";
import TextInput from "components/TextInput";
import Button from "components/Button";

export default {
  title: "Component/ClientForm",
  component: ClientForm,
} as ComponentMeta<typeof ClientForm>;

const Template: Story<ComponentProps<typeof ClientForm>> = (args) => (
  <ClientForm {...args} />
);

export const SignUp = Template.bind({});
SignUp.args = {
  title: "Sign Up",
  children: (
    <Fragment>
      <TextInput label="Name" name="name" />
      <TextInput label="Email" name="email" className="mt-6" />
      <TextInput label="Password" name="password" className="mt-6" />
      <div className="flex mt-6">
        <TextInput label="Phone" name="phone" className="mr-6" />
        <TextInput label="Address" name="address" />
      </div>
      <Button style="primary" className="mt-6">
        Sign Up
      </Button>
    </Fragment>
  ),
};

export const SignIn = Template.bind({});
SignIn.args = {
  title: "Sign In",
  children: (
    <Fragment>
      <TextInput label="Email" name="email" />
      <TextInput label="Password" name="password" className="mt-6" />
      <Button style="primary" className="mt-6">
        Sign In
      </Button>
    </Fragment>
  ),
};

export const InContainer = WithContainer(Template);
InContainer.args = SignUp.args;
InContainer.containerArgs = {
  className: "flex justify-center",
};
