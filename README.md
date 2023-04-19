# Employee Manager Web

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Clone the repository

```bash
$ git clone https://github.com/shehanswivel/employee-manager-web.git
```

## Installation

```bash
$ npm install
# or
$ yarn install
```

## Environment variables

```bash
# REST API base URL
NEXT_PUBLIC_BASE_URL=<https://your-rest-api.com>
```

## Running the app

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test

```bash
# unit tests
$ npm test
```

## Project structure

```bash
src/            # Source folder
  __tests__/    # Contains all the app test files
  components/   # Contains all the app components
  config/       # Contains app configurations
  constants/    # Contains all the constants
  contexts/     # Contains all the context providers
  hooks/        # Contains all the custom hooks
  layouts/      # Contains all the app layouts
  pages/        # Contains all the pages
    employee/       
  services/     # Contains all the service files
  store/        # Contains redux store and slices
    /slices     # Contains redux slices    
  styles/       # Contains all the style files
  types/        # Contains all the custom types
test/
.env.development
.env.production
.eslintrc.json
.gitignore
jest.config.js
next.config.js
package-lock.json
package.json
README.md
tsconfig.json
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
