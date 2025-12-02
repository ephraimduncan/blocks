# Contributing

We welcome contributions to our project! This guide will help you get started with development and contributing to the blocks registry.

## Development

### Prerequisites

- **Bun** - This project uses Bun as the package manager
- **Node.js 18+** - Required for Next.js

### Getting Started

1. Fork the repository on GitHub.

2. Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/blocks.git
   cd blocks
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Start the development server:

   ```bash
   bun run dev
   ```

   The development server will be available at `http://localhost:3000`.

### Scripts

```bash
# Development
bun run dev              # Start dev server with Turbopack
bun run build            # Build the project
bun run start            # Start production server

# Registry Management
bun run generate:registry    # Generate registry.json
bun run generate:markdown    # Generate MDX documentation
bun run validate:registry    # Validate registry structure

# Code Quality
bunx ultracite lint         # Lint codebase with Biome
```

### Project Structure

```
blocks/
├── app/                    # Next.js app router pages
├── components/             # Shared UI components
├── content/
│   ├── components/         # Block implementations
│   ├── markdown/           # Generated MDX docs
│   ├── blocks-metadata.ts  # Block registry metadata
│   └── blocks-categories.tsx # Category definitions
├── lib/                    # Utility functions
├── public/
│   └── r/                  # Registry JSON files
├── scripts/                # Build and generation scripts
└── registry.json           # Main registry file
```

### Adding New Blocks

We'd love your block contributions! To keep the library well-organized, we ask that you **add blocks to existing categories** rather than creating new ones. If you have ideas for a new category, feel free to open an issue to discuss it with the maintainers.

Existing categories can be found in `content/blocks-categories.tsx`.

1. **Create the component** in `content/components/{category}/{block-id}.tsx`
2. **Register metadata** in `content/blocks-metadata.ts`
3. **Map the component** in `content/blocks-components.tsx`
4. **Export from category** in `content/components/{category}/index.ts`
5. **Generate registry** with `bun run generate:registry`

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines.

## Contributing Process

1. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b your-branch-name
   ```

2. Make your changes to the codebase.

3. Build and test the project:

   ```bash
   bun run build
   ```

4. Test the application to ensure your changes work as expected.

5. Run linting to ensure code quality:

   ```bash
   bunx ultracite lint
   ```

6. Commit your changes:

   ```bash
   git commit -m "Your descriptive commit message"
   ```

7. Push your changes to your fork:

   ```bash
   git push -u origin your-branch-name
   ```

8. Open a pull request on the original repository.

Thank you for contributing to our project!
