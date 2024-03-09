import { withAppLayout } from "@/components/decorators/withPageLayout";
import { PostSwiper } from "./PostSwiper";
import { Meta, StoryFn } from "@storybook/react";

const Template: StoryFn<typeof PostSwiper> = (args) => <PostSwiper {...args} />;

export const Default = Template.bind({});
Default.args = {
  posts: [
    {
      id: "clt7hdo790001ikmgxr9zn7ff",
      title: "iPhone 15",
      price: 9000,
      description: "From Ozzy.",
      thumbnail: "thumbnail-0.webp",
      images: [
        "iPhone-15-1709226586204-0.webp",
        "iPhone-15-1709226586204-1.webp",
      ],
      ownerId: "clt5hzs6c000eglyjib0a5brs",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "clt7eogk00007kzp20srm004e",
      title: "iPhone 15 Pro 256GB",
      price: 9000,
      description: "Brand new, never used",
      thumbnail: null,
      images: [
        "iPhone-15-Pro-256GB-1709222051302-0.webp",
        "iPhone-15-Pro-256GB-1709222051302-1.webp",
      ],
      ownerId: "clt5hzs6c000eglyjib0a5brs",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "clt6bnze50005kzp21ysf7v21",
      title: "iPhone 15 Pro 256GB",
      price: 8999,
      description: "Never used",
      thumbnail: null,
      images: [],
      ownerId: "clt5hzs6c000eglyjib0a5brs",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "clt5yi7nu0001iibe40s63rd6",
      title: "iPhone 15 Pro 256GB",
      price: 9000,
      description: "Brand new, never used.",
      thumbnail: null,
      images: [
        "iPhone-15-Pro-256GB-1709134420117-0.webp",
        "iPhone-15-Pro-256GB-1709134420117-1.webp",
      ],
      ownerId: "clt5hzs6c000eglyjib0a5brs",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "clt5ifsi0000qglyjowgk34r5",
      title: "uaijsdokpalsd",
      price: 48329,
      description: "aoisjdopaspkdojisaijdk",
      thumbnail: null,
      images: [
        "uaijsdokpalsd-1709107433360-0.webp",
        "uaijsdokpalsd-1709107433360-1.webp",
      ],
      ownerId: "clt5hzs6c000eglyjib0a5brs",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
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
