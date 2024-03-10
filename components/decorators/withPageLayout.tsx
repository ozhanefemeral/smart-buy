import { Decorator } from "@storybook/react";
import { PageLayout } from "@/components/layout/layout";

export const withAppLayout: Decorator = (Story) => (
  <PageLayout>
    <Story />
  </PageLayout>
);
