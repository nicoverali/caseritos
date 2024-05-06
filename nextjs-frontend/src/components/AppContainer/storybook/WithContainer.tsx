import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import AppContainer from "..";
import { StoryFnReactReturnType } from "@storybook/react/dist/ts3.9/client/preview/types";

type ContainedStory<T> = Story<T> & {
  containerArgs?: ComponentProps<typeof AppContainer>;
};

type StoryFN = () => StoryFnReactReturnType;

function WithContainer<T>(ChildrenTemplate: Story<T>): ContainedStory<T> {
  const ChildrenStory = ChildrenTemplate.bind({}) as ContainedStory<T>;
  ChildrenStory.decorators = [
    function (this: ContainedStory<T>, Story: StoryFN) {
      return (
        <AppContainer {...this.containerArgs}>
          <Story />
        </AppContainer>
      );
    }.bind(ChildrenStory),
  ];

  return ChildrenStory;
}

export default WithContainer;
