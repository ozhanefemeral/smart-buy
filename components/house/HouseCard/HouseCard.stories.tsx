import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { HouseCard } from "./HouseCard";
import { House } from "@/components/house";

const availableHouse: House = {
  id: 1,
  title: "Beautiful House",
  city: "Warsaw",
  district: "Mokotów",
  price: 100000,
  available: "available",
};

const soonHouse: House = {
  id: 2,
  title: "Beautiful House",
  city: "Poznań",
  district: "Jeżyce",
  price: 100000,
  available: "soon",
};

const unavailableHouse: House = {
  id: 3,
  title: "Beautiful House",
  city: "Kraków",
  district: "Kazimierz",
  price: 100000,
  available: "unavailable",
};

const Template: StoryFn<typeof HouseCard> = (args) => <HouseCard {...args} />;

export const Available = Template.bind({});
Available.args = {
  house: availableHouse,
};

export const Soon = Template.bind({});
Soon.args = {
  house: soonHouse,
};

export const Unavailable = Template.bind({});
Soon.args = {
  house: unavailableHouse,
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
