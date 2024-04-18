# Smart Buy - Online Marketplace

Smart Buy is an online marketplace built with Next.js, incorporating various technologies to provide a seamless shopping experience. This README serves as a guide to understand the project's tech stack, naming conventions, file structure, and best practices.

[Live preview](smartbuy-market.vercel.app)

## Tech Stack

- **Next.js 13 with TypeScript**: Next.js provides server-side rendering and a great developer experience, while TypeScript adds static typing for improved code quality.
- **Prisma ORM, PostgreSQL with Supabase Database**: Prisma is used as the ORM (Object-Relational Mapping) tool for database interactions, with PostgreSQL as the relational database managed by Supabase.
- **Storybook**: Storybook allows for isolated development of UI components, aiding in building and testing reusable UI elements.
- **Tailwind CSS**: Tailwind CSS is used for styling, providing a utility-first approach for rapid UI development.
- **Next-Auth with Google OAuth**: Next-Auth handles authentication, while Google OAuth integration allows users to sign in securely using their Google accounts.
- **AWS S3 and DynamoDB**: AWS S3 is utilized for file storage, while DynamoDB serves as the NoSQL database for scalable and flexible data storage.

## Naming Conventions

- **File Names**: File names follow a descriptive convention, utilizing kebab-case for readability (`file-name.tsx`).
- **Component Naming**: Components are organized under specific categories (`home`, `layout`, `post`, etc.), with each component having a clear and concise name (`ComponentName.tsx`).
- **Directory Structure**: Directories are named according to their purpose or category (`components`, `lib`, etc.), ensuring logical organization and easy navigation.

## Best Practices

- **Exporting Components**: Components are exported using `index.ts` files to provide a single entry point for importing. For example:

  ```typescript
  // components/post/index.ts
  export type { Post } from "@prisma/client";

  export * from "./PostCard";
  export * from "./PostCarousel";
  export * from "./PostStats";
  ```

- **Import Aliases**: Import aliases are used to simplify imports and improve readability. For example:

  ```typescript
  // Before
  import { authOptions } from "../../../lib/auth";

  // After
  import { authOptions } from "@/lib/auth";
  ```

## Usage

To run the project locally, follow these steps:

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install` or `pnpm install`
3. Create a `.env` file in the root directory of the project.
4. Refer to the provided `.env.example` file for the necessary environment variables and their format.

Once you've set up the environment variables in your `.env` file, you can start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This will start the development server at `http://localhost:3000`.
