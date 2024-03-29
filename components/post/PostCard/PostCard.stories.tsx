import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { PostCard } from "./PostCard";
import { Post } from "@prisma/client";

const phone: Post = {
  id: "123-asd",
  title: "iPhone 15 Pro",
  thumbnail: "seed-phone-thumbnail.webp",
  description: "Brand new iPhone 15 Pro",
  price: 1000,
  createdAt: new Date(),
  updatedAt: new Date(),
  images: [],
  ownerId: "123",
  isPublished: true,
};

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  post: phone,
  width: 300,
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
