import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { PostCard } from "./PostCard";
import { Post } from "@prisma/client";

const availableHouse: Post = {
  id: "123-asd",
  title: "House 1",
  description: "A beautiful house",
  price: 100000,
  createdAt: new Date(),
  updatedAt: new Date(),
  images: [],
  ownerId: "123",
};

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;

export const Available = Template.bind({});
Available.args = {
  post: availableHouse,
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
