# Contributing to lioon

We love your input! We want to make contributing to lioon as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows TypeScript best practices
6. Issue that pull request!

## Development Setup

```bash
# Clone your fork of the repo
git clone https://github.com/<your-username>/lioon.git
cd lioon

# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm -r build

# Run tests
pnpm test

# Run the sample application
cd packages/lioon-react-sample
pnpm dev
```

## TypeScript Guidelines

- Avoid using `any` type - use type inference or explicit types instead
- Break down complex types into smaller, reusable interfaces
- Use generics to make components and functions more flexible

## Package Structure

- `packages/lioon-core`: Core i18n functionality
  - Translation engine
  - File I/O utilities
  - Type definitions
- `packages/lioon-react`: React integration
  - React hooks and components
  - Vite plugin for i18n extraction
- `packages/lioon-react-sample`: Example application
  - Demonstrates usage patterns
  - Used for development and testing

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the version numbers following [Semantic Versioning](https://semver.org/)
3. Add tests for any new functionality
4. The PR will be merged once you have the sign-off of one maintainer

## License

By contributing, you agree that your contributions will be licensed under its MIT License.