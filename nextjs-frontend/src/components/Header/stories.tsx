import React, { ComponentProps } from "react";
import { Story, ComponentMeta } from "@storybook/react";
import Header from ".";
import HeaderLeft, { HeaderLeftProps } from "./HeaderLeft";
import HeaderRight, { HeaderRightProps } from "./HeaderRight";

export default {
  title: "Component/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "200vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Header>;

const DefaultTemplate: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);

type ChildTemplateArgs = ComponentProps<typeof Header> & {
  left?: { args: HeaderLeftProps };
  right?: { args: HeaderRightProps };
};
const ChildTemplates: Story<ChildTemplateArgs> = ({ left, right, ...args }) => (
  <Header {...args}>
    {left && <HeaderLeft {...left.args} />}
    {right && <HeaderRight {...right.args} />}
  </Header>
);

export const Unlift = DefaultTemplate.bind({});
Unlift.args = {
  lift: false,
  bg: "bg-gray-50",
};

export const Lift = DefaultTemplate.bind({});
Lift.args = {
  lift: true,
  bg: "bg-gray-50",
};

export const CenteredContent = DefaultTemplate.bind({});
CenteredContent.args = {
  bg: "bg-gray-50",
  children: (
    <p className="m-auto font-medium text-lg text-center px-4 py-2 border-2 border-black">
      Content
    </p>
  ),
};

export const AltColors = DefaultTemplate.bind({});
AltColors.args = {
  bgUnlift: "bg-gray-50",
  bgLift: "bg-primary",
  children: (
    <p className="m-auto font-medium text-lg text-center px-4 py-2 border-2 border-black">
      Content
    </p>
  ),
};

export const LeftChild = ChildTemplates.bind({});
LeftChild.args = {
  left: {
    args: {
      children: (
        <p className="m-auto font-medium text-lg text-center px-4 py-2 border-2 border-black">
          Left Content
        </p>
      ),
      className: "bg-primary flex items-center",
    },
  },
};

export const RightChild = ChildTemplates.bind({});
RightChild.args = {
  right: {
    args: {
      children: (
        <p className="m-auto font-medium text-lg text-center px-4 py-2 border-2 border-black">
          Right Content
        </p>
      ),
      className: "bg-primary flex items-center",
    },
  },
};

export const BothChilds = ChildTemplates.bind({});
BothChilds.args = {
  left: {
    args: {
      children: (
        <p className="m-auto font-medium text-lg text-center px-4 py-2 border-2 border-black">
          Left Content
        </p>
      ),
      className: "bg-primary flex items-center",
    },
  },
  right: {
    args: {
      children: (
        <p className="m-auto font-medium text-lg text-center px-4 py-2 border-2 border-black">
          Right Content
        </p>
      ),
      className: "bg-primary flex items-center",
    },
  },
};
