import { PostCarousel } from "./PostCarousel";
import { Meta, StoryFn } from "@storybook/react";

const Template: StoryFn<typeof PostCarousel> = (args) => (
  <PostCarousel {...args} />
);

export const Default = Template.bind({});

const meta: Meta<typeof PostCarousel> = {
  component: PostCarousel,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
