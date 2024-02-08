import { House } from "@/components/house";
import { HouseCard } from "@/components/house/HouseCard";
import { HouseCarousel } from "./HouseCarousel";
import { Meta, StoryFn } from "@storybook/react";

const Template: StoryFn<typeof HouseCarousel> = (args) => (
  <HouseCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  endpoint: "https://api.example.com/houses",
};

const meta: Meta<typeof HouseCard> = {
  component: HouseCard,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
