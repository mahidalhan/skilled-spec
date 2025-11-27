# Skill Tools Plugin

Meta-plugin for creating, validating, and packaging custom Claude skills.

## What's Included

### 1 Skill: skill-creator

Comprehensive guide and tools for building custom Claude skills.

**Includes**:
- Complete skill creation workflow (6 steps)
- Python scaffolding scripts
- Validation and packaging tools
- Best practices guide

## Installation

```bash
# Add marketplace
/plugin marketplace add mahidalhan/skilled-spec

# Install plugin
/plugin install skill-tools@mahidalhan/skilled-spec
```

## Quick Start

### Create a New Skill

Claude uses the `skill-creator` skill automatically when you mention creating skills:

```
Create a skill for processing CSV files
```

**What happens**:
1. Claude guides you through skill design
2. Generates skill structure with SKILL.md
3. Creates example resources (scripts/, references/, assets/)
4. Validates structure
5. Packages for distribution (optional)

### Manual Scaffolding

Use the included Python scripts directly:

```bash
cd .claude/skills/skill-creator

# Create new skill
python scripts/init_skill.py --path ../my-new-skill

# Validate structure
python scripts/quick_validate.py ../my-new-skill

# Package for distribution
python scripts/package_skill.py ../my-new-skill
```

## Skill Creation Workflow

### Step 1: Design with Concrete Examples
- Start with specific use cases
- Identify inputs and outputs
- Define success criteria

### Step 2: Plan Resources
- SKILL.md (instructions)
- scripts/ (executable code)
- references/ (documentation)
- assets/ (templates, files)

### Step 3: Initialize Structure
```bash
python scripts/init_skill.py --path ./my-skill
```

Creates:
```
my-skill/
├── SKILL.md (template with TODOs)
├── scripts/
│   └── example_script.py
├── references/
│   └── example_reference.md
└── assets/
    └── example_asset.txt
```

### Step 4: Write SKILL.md
Fill in the template:
```yaml
---
name: my-skill
description: What this skill does and when to use it
---

# My Skill

## Instructions
[Step-by-step guidance for Claude]

## Examples
[Concrete usage examples]
```

### Step 5: Validate
```bash
python scripts/quick_validate.py ./my-skill
```

Checks:
- SKILL.md exists and has frontmatter
- Frontmatter has required fields (name, description)
- Directory structure is valid

### Step 6: Package (Optional)
```bash
python scripts/package_skill.py ./my-skill
```

Creates: `my-skill.zip` ready for distribution

## Progressive Disclosure Pattern

Skills should load information in stages:

**Level 1: Metadata** (always loaded):
```yaml
---
name: pdf-processor
description: Extract text from PDFs, fill forms...
---
```

**Level 2: Instructions** (loaded when triggered):
```markdown
# PDF Processing

## Quick Start
Use pdfplumber to extract text...
```

**Level 3: Resources** (loaded as needed):
```
references/
  advanced_forms.md     # Only loaded if working with forms
  api_reference.md      # Only loaded if needed
scripts/
  process_pdf.py        # Executed via bash, never loads into context
```

## Best Practices

### Do:
✅ Keep SKILL.md under 5,000 words (~800 lines)
✅ Use progressive disclosure (reference external files)
✅ Include concrete examples
✅ Write clear, imperative instructions
✅ Bundle reusable scripts
✅ Provide detailed references

### Don't:
❌ Embed everything in SKILL.md (use references/)
❌ Use second-person language ("you should...")
❌ Hardcode absolute paths
❌ Skip validation before packaging
❌ Forget frontmatter fields

## Included Scripts

### init_skill.py
**Purpose**: Scaffold new skill structure

**Usage**:
```bash
python scripts/init_skill.py --path ./skill-name
```

**Creates**:
- SKILL.md template with frontmatter and TODOs
- Example directories (scripts/, references/, assets/)
- Example files in each directory

### quick_validate.py
**Purpose**: Validate skill structure

**Usage**:
```bash
python scripts/quick_validate.py ./skill-name
```

**Checks**:
- SKILL.md exists
- Valid YAML frontmatter
- Required fields present (name, description)
- No syntax errors

### package_skill.py
**Purpose**: Package skill for distribution

**Usage**:
```bash
python scripts/package_skill.py ./skill-name
```

**Creates**:
- `skill-name.zip` containing all files
- Excludes common ignore patterns (.git, __pycache__, etc.)
- Ready to upload or share

## Example: Creating a CSV Processor Skill

### 1. Design
```
Use case: Process CSV files with pandas
Input: CSV file path
Output: Cleaned data, summary statistics
```

### 2. Initialize
```bash
python scripts/init_skill.py --path ./csv-processor
```

### 3. Write SKILL.md
```yaml
---
name: csv-processor
description: Process and analyze CSV files using pandas. Use when working with CSV data, data cleaning, or statistical analysis.
---

# CSV Processor

## Quick Start

```python
import pandas as pd
df = pd.read_csv("data.csv")
df.describe()
```

See [REFERENCE.md](references/pandas_guide.md) for advanced usage.
```

### 4. Add References
Create `references/pandas_guide.md` with detailed pandas documentation.

### 5. Add Scripts
Create `scripts/clean_csv.py` for data cleaning automation.

### 6. Validate & Package
```bash
python scripts/quick_validate.py ./csv-processor
python scripts/package_skill.py ./csv-processor
```

## Directory Structure

```
skill-tools/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── skill-creator/
│       ├── SKILL.md (210 lines)
│       ├── LICENSE.txt
│       └── scripts/
│           ├── init_skill.py
│           ├── quick_validate.py
│           └── package_skill.py
└── README.md (this file)
```

## Requirements

- Python 3.7+
- No external Python dependencies (uses only stdlib)
- Works on macOS, Linux, Windows

## Support

- Repository: https://github.com/mahidalhan/skilled-spec
- Marketplace: Skilled Intelligence
- Skill Development Guide: See SKILL.md in skill-creator/
- Issues: Report via GitHub

## License

See LICENSE.txt in the repository root.
