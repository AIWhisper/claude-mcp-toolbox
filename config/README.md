# Secure MCP Configuration

## Setup

1. Create two environment files:

`.env.brave`:
```
BRAVE_API_KEY=your_key_here
```

`.env.github`:
```
GITHUB_PERSONAL_ACCESS_TOKEN=your_pat_here
```

2. These files will be automatically used by the Docker containers and never committed to the repository.

## How it Works

- Each MCP tool runs in its own container
- API keys are stored in separate environment files
- Configuration is mounted read-only in containers
- No terminal commands needed - works automatically with Claude desktop
