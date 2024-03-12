import { withAppLayout } from "@/components/decorators/withPageLayout";
import { PostSwiper } from "./PostSwiper";
import { Meta, StoryFn } from "@storybook/react";
import { dummyPosts as posts } from "@/.storybook/dummy-data";

const Template: StoryFn<typeof PostSwiper> = (args) => <PostSwiper {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts,
};

const meta: Meta<typeof PostSwiper> = {
  component: PostSwiper,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [withAppLayout],
};

export default meta;
