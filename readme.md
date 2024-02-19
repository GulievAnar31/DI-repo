# Express TypeScript Boilerplate

This is a boilerplate project for building RESTful APIs using Express.js and TypeScript. It comes pre-configured with essential tools and libraries for developing and deploying modern Node.js applications.

## Features

- **TypeScript**: Build your project with TypeScript for improved code quality and maintainability.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **JSON Web Tokens (JWT)**: Secure authentication and authorization using JWT.
- **Prisma**: Modern database toolkit for TypeScript and Node.js.
- **Dependency Injection**: Utilize InversifyJS for managing dependencies and promoting clean architecture.
- **Validation**: Validate request payloads using class-validator and class-transformer.
- **Logging**: Structured logging with tslog.
- **Linting**: Ensure code consistency and quality with ESLint.
- **Testing**: Easy-to-use testing setup with Jest.
- **Environment Variables**: Configuration management using dotenv.
- **Debugging**: Debug your TypeScript code with ease using built-in configurations.
- **Automatic Code Formatting**: Prettier setup for automatic code formatting.

## Installation

1. Clone this repository: `git clone https://github.com/GulievAnar31/DI-repo`
2. Navigate into the project directory: `cd di-repo`
3. Install dependencies: `npm install`

## Usage

- **Development**: Run `npm run start:dev` to start the development server with hot reloading enabled.
- **Production**: Build your project with `npm run build` and start the server with `npm start`.
- **Database Management**: Run `npm run db:watch` to open Prisma Studio for managing your database.

## Scripts

- `npm run lint`: Lint the codebase using ESLint.
- `npm run build`: Build the TypeScript source code.
- `npm start`: Start the production server.
- `npm run debug`: Start the server in debug mode with nodemon.
- `npm run generate`: Generate Prisma client.
- `npm test`: Run tests using Jest.
- `npm run db:watch`: Open Prisma Studio for managing the database.
- `npm run db:generate`: Generate Prisma client.

## Configuration

Environment variables can be configured using a `.env` file in the root directory. Refer to the provided `.env.example` for required variables.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve this project.

## Author

Created by Anar.
