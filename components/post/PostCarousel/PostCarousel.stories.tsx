import { PostCard } from "@/components/post";
import { PostCarousel } from "./PostCarousel";
import { Meta, StoryFn } from "@storybook/react";

const Template: StoryFn<typeof PostCarousel> = (args) => (
  <PostCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  endpoint: "https://api.example.com/houses",
};

const meta: Meta<typeof PostCard> = {
  component: PostCard,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
