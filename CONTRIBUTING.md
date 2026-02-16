# Contributing to PathFinder AI

Thank you for considering contributing to PathFinder AI! 🎉

## How to Contribute

1. **Fork the repository**
2. **Create a branch** (`git checkout -b feature/YourFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit** (`git commit -m 'Add YourFeature'`)
6. **Push** (`git push origin feature/YourFeature`)
7. **Open a Pull Request**

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Add comments for complex logic
- Write descriptive commit messages

## Reporting Bugs

Open an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## Feature Requests

We welcome feature ideas! Open an issue with:
- Problem description
- Proposed solution
- Alternative solutions considered
```

---

### 3. **.gitignore** (if not exists)
```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Database
*.sqlite
*.db