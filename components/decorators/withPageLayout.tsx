import { Decorator } from "@storybook/react";
import { PageLayout } from "../layout/layout";

export const withAppLayout: Decorator = (Story) => (
  <PageLayout>
    <Story />
  </PageLayout>
);
