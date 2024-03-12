import { Meta, StoryFn } from "@storybook/react";
import { PostGrid } from "./PostGrid";
import { withAppLayout } from "@/components/decorators/withPageLayout";
import { dummyPosts as posts } from "@/.storybook/dummy-data";
const Template: StoryFn<typeof PostGrid> = (args) => <PostGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts,
};

const meta: Meta<typeof PostGrid> = {
  component: PostGrid,
  decorators: [withAppLayout],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
