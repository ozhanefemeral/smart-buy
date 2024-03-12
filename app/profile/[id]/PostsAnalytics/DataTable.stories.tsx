import { Meta, StoryFn } from "@storybook/react";
import { DataTable } from "./DataTable";
import { dummyPostsWithStats } from "@/.storybook/dummy-data";
import { columns } from "./columns";

const Template: StoryFn<typeof DataTable> = (args) => <DataTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: columns,
  data: dummyPostsWithStats,
};

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
