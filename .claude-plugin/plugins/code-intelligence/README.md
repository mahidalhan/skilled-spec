# Code Intelligence Plugin

Intelligent code search and architectural analysis for evidence-based development.

## What's Included

### 2 Powerful Skills

1. **exa-code-context** - Search billions of GitHub repositories, Stack Overflow posts, and documentation
2. **architecture-introspector** - Analyze software architectures using first-principles thinking and SpaceX's 5-step methodology

## Installation

```bash
# Add marketplace
/plugin marketplace add mahidalhan/skilled-spec

# Install plugin
/plugin install code-intelligence@mahidalhan/skilled-spec
```

## Setup Required

### Exa API Key

The `exa-code-context` skill requires an Exa API key.

1. **Get API Key**: Visit https://dashboard.exa.ai/api-keys
2. **Add to .env**: Create a `.env` file at your **project root**:
   ```bash
   EXA_API_KEY=your-api-key-here
   ```

   > **Note**: The skill will search for `.env` in these locations (in order):
   > 1. Project root (`.env`) - recommended
   > 2. Backend subfolder (`/backend/.env`)

3. **Install Dependencies**:
   ```bash
   pip install requests python-dotenv
   ```

## Quick Start

### Using Exa Code Search

Claude automatically uses the `exa-code-context` skill when you need code examples:

```
How do I use React hooks for state management?
```

**What happens**:
- Searches billions of GitHub repos
- Finds real, working code examples
- Returns token-efficient context
- Eliminates hallucinations

**Manual usage**:
```bash
cd .claude/skills/exa-code-context
python scripts/get_code_context.py "FastAPI async endpoints" 5000
```

### Using Architecture Introspector

Claude uses this skill when analyzing architectures:

```
Analyze our authentication architecture for unnecessary complexity
```

**What it does**:
- Applies deletion-first philosophy
- Questions every abstraction
- Identifies cargo-cult patterns
- Uses modularity principle (2-3 rule)

## Features

### Exa Code Context

**Prevents Hallucinations**:
- Real code from GitHub, not made-up patterns
- Current API syntax (not outdated)
- Working examples from production codebases

**Token-Efficient**:
- Returns only relevant code snippets
- Configurable token limits (dynamic, 5000, 10000, custom)
- Progressive disclosure

**Comprehensive Coverage**:
- Billions of GitHub repositories
- Stack Overflow posts
- Official documentation sites
- Framework examples

### Architecture Introspector

**SpaceX 5-Step Methodology**:
1. Question the requirement
2. Delete the part/process
3. Simplify and optimize
4. Accelerate cycle time
5. Automate

**First-Principles Analysis**:
- Question every abstraction
- Delete unnecessary complexity
- Simplify before optimizing
- Identify technical debt

**Anti-Pattern Detection**:
- Enterprise Fizz-Buzz (over-engineering simple tasks)
- Premature Abstraction
- Cargo Cult Architecture
- Death by a Thousand Microservices

## Usage Examples

### Code Search Examples

**Framework Usage**:
```
Show me Next.js 14 app router with TypeScript configuration
```

**API Syntax**:
```
What's the correct syntax for FastAPI async endpoints with dependencies?
```

**Best Practices**:
```
Find authentication patterns in Express.js applications
```

### Architecture Analysis Examples

**Evaluate Complexity**:
```
Is our three-layer service architecture justified given we only have 2 API consumers?
```

**Question Abstractions**:
```
Analyze whether our repository pattern adds value or just ceremony
```

**Identify Technical Debt**:
```
Review our microservices setup for unnecessary services
```

## Token Management (Exa)

The exa-code-context skill supports flexible token management:

- **"dynamic"** (default): Automatically determines optimal response length
- **5000**: Good default for most queries
- **10000**: More comprehensive context
- **Custom**: Any value 50-100000

**Cost tracking**: Each response includes `costDollars` field.

## Directory Structure

```
code-intelligence/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── exa-code-context/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   │   └── get_code_context.py
│   │   └── references/
│   │       └── api_reference.md
│   └── architecture-introspector/
│       ├── SKILL.md
│       ├── README.md
│       └── references/
│           └── first_principles_framework.md
└── README.md (this file)
```

## Requirements

### Exa Code Context
- Exa API key (get from https://dashboard.exa.ai/api-keys)
- Python 3.7+ with `requests` and `python-dotenv`
- `.env` file at project root with API key

### Architecture Introspector
- No external dependencies
- Works immediately after installation

## Troubleshooting

**"No API key found"**:
- Verify `.env` file exists at project root with `EXA_API_KEY=your-key`
- Alternatively, create `/backend/.env` if using backend subfolder structure
- Ensure `.env` file is not in `.gitignore` (it should be to avoid committing secrets)

**"Poor search results"**:
- Make queries more specific
- Include technology names and versions
- Try different phrasings

**"Not enough context"**:
- Increase token count from "dynamic" to 5000 or 10000
- Split complex queries into multiple simpler ones

## Support

- Repository: https://github.com/mahidalhan/skilled-spec
- Marketplace: Skilled Intelligence
- Exa Docs: https://docs.exa.ai/reference/context
- Issues: Report via GitHub

## License

See LICENSE.txt in the repository root.
