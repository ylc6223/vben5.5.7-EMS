# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + Vite + TypeScript monorepo admin template called Vue Vben Admin. It uses a monorepo structure with multiple apps and packages organized by functionality.

## Repository Structure

- `apps/` - Contains the main applications
  - `web-ele/` - Element Plus based admin frontend
  - `backend-mock/` - Mock backend API server
- `packages/` - Contains reusable packages organized by functionality
  - `@core/` - Core UI components and utilities
  - `effects/` - Business logic and UI components
  - `plugins/` - Integration plugins (e.g., echarts, vxe-table)
- `internal/` - Internal tooling and configurations
- `scripts/` - Deployment and utility scripts

## Common Development Commands

### Install Dependencies
```bash
pnpm install
```

### Development
```bash
# Start all development servers
pnpm dev

# Start specific app development server
pnpm dev:ele     # Element Plus version
pnpm dev:antd    # Ant Design Vue version
pnpm dev:naive   # Naive UI version
```

### Building
```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:ele   # Element Plus version
pnpm build:antd  # Ant Design Vue version
pnpm build:naive # Naive UI version
```

### Testing
```bash
# Run unit tests
pnpm test:unit

# Run end-to-end tests
pnpm test:e2e

# Type checking
pnpm check:type
```

### Code Quality
```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Check dependencies
pnpm check:dep

# Check for circular dependencies
pnpm check:circular
```

## Architecture Overview

The project follows a modular architecture with clear separation of concerns:

1. **Core Layer** (`@core` packages) - Fundamental UI components and utilities
2. **Effects Layer** (`effects` packages) - Business logic and enhanced UI components
3. **Application Layer** (`apps`) - Complete applications that consume the packages
4. **Plugins Layer** (`plugins` packages) - Third-party integrations and extensions

The frontend uses Vue 3 with Composition API, TypeScript for type safety, and follows a component-based architecture with Tailwind CSS for styling.

## Key Technologies

- Vue 3 + Vite
- TypeScript
- Element Plus (primary UI library)
- Tailwind CSS
- Pinia (state management)
- Vue Router
- Turbo (monorepo task runner)
- Pnpm (package manager)