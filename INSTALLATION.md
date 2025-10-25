# Installation Guide

This guide covers both installation methods for Spec'd Out Skills. Choose the method that best fits your workflow.

## Prerequisites

- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) installed and configured
- Git (for cloning the repository)
- A project where you want to use spec-driven development

## Method 1: Plugin Installation (Recommended)

Plugin installation provides automatic setup and easier updates.

### Step 1: Add the Marketplace

```bash
# Start Claude Code in your project
cd your-project
claude

# Add the marketplace (one-time setup)
/plugin marketplace add https://github.com/mahidalhan/specd-out-skills
```

### Step 2: Install the Plugin

```bash
# Install the spec-driven-dev plugin
/plugin install spec-driven-dev

# Claude Code will show a confirmation
# Select "Install now" to proceed
```

### Step 3: Restart Claude Code

```bash
# Exit Claude Code (Ctrl+C or type 'exit')
# Restart in your project directory
claude
```

### Step 4: Verify Installation

```bash
# Check that skills are available
/help

# You should see the four skills listed
# Try creating your first proposal
You: I want to add a test feature
```

### Updating the Plugin

```bash
# When updates are available
/plugin update spec-driven-dev

# Or reinstall
/plugin uninstall spec-driven-dev
/plugin install spec-driven-dev
```

## Method 2: Direct Copy

Direct copy is simpler for small teams or when you want to customize the skills heavily.

### Option A: Install in Existing Project

```bash
# Navigate to your project
cd your-project

# Clone into .claude/plugins directory
git clone https://github.com/mahidalhan/specd-out-skills .claude/plugins/spec-driven-dev

# Copy skills to .claude/skills (so Claude Code finds them)
mkdir -p .claude/skills
cp -r .claude/plugins/spec-driven-dev/skills/* .claude/skills/

# Start Claude Code
claude
```

### Option B: Use as Standalone Project

```bash
# Clone the repository
git clone https://github.com/mahidalhan/specd-out-skills
cd specd-out-skills

# The skills directory is already in place
# Start Claude Code
claude

# Skills are immediately available
```

### Option C: Add to Version Control (Team Setup)

```bash
# In your project repository
cd your-project

# Add as a subtree or submodule
git subtree add --prefix .claude/skills/spec-driven-dev \
  https://github.com/mahidalhan/specd-out-skills.git main --squash

# Or as a submodule
git submodule add https://github.com/mahidalhan/specd-out-skills.git \
  .claude/plugins/spec-driven-dev

# Copy skills
cp -r .claude/plugins/spec-driven-dev/skills/* .claude/skills/

# Commit
git add .claude/
git commit -m "Add spec-driven development skills"
git push
```

Team members then get the skills automatically when they clone:

```bash
# Team member clones the project
git clone your-project-repo
cd your-project

# Skills are already there
claude
```

## Verification

After installation, verify the skills are working:

### 1. Check Available Skills

Start Claude Code and look for the skills in context:

```bash
claude
```

### 2. Test Skill Activation

Try creating a simple proposal:

```
You: Create a proposal for a test feature
```

Claude should activate the `spec-proposal-creation` skill and create a structured proposal.

### 3. Check File Structure

After creating a proposal, verify the directory structure:

```bash
ls -R spec/
```

You should see:

```
spec/
├── changes/
│   └── test-feature/
│       ├── proposal.md
│       ├── tasks.md
│       └── specs/
```

## Troubleshooting

### Skills Not Activating

**Problem:** Claude doesn't seem to recognize the skills.

**Solutions:**

1. **Restart Claude Code** after installation
2. **Check skill location:**
   ```bash
   # Skills should be in one of these locations:
   ls -la .claude/skills/
   ls -la .claude/plugins/spec-driven-dev/skills/
   ```
3. **Try explicit activation:**
   ```
   You: Use the spec-proposal-creation skill to create a proposal for X
   ```

### Plugin Installation Fails

**Problem:** `/plugin install` fails or marketplace not found.

**Solutions:**

1. **Verify marketplace URL:**
   ```bash
   /plugin marketplace list
   ```
2. **Try adding marketplace again:**
   ```bash
   /plugin marketplace remove specd-out-skills
   /plugin marketplace add https://github.com/mahidalhan/specd-out-skills
   ```
3. **Check network connection** (marketplace requires internet access)
4. **Fall back to direct copy method** if plugin system has issues

### Permission Errors (Direct Copy)

**Problem:** `cp: Permission denied` when copying skills.

**Solutions:**

```bash
# Create .claude directory first
mkdir -p .claude/skills

# Use sudo only if absolutely necessary (not recommended)
# Better: fix permissions
chmod -R u+w .claude/
```

### Files Already Exist

**Problem:** Directory already exists when installing.

**Solutions:**

```bash
# Remove existing installation
rm -rf .claude/skills/spec-proposal-creation
rm -rf .claude/skills/spec-implementation
rm -rf .claude/skills/spec-archiving
rm -rf .claude/skills/spec-context-loading

# Or remove plugin
rm -rf .claude/plugins/spec-driven-dev

# Then reinstall
```

## Uninstallation

### Uninstall Plugin

```bash
# In Claude Code
/plugin uninstall spec-driven-dev

# Or manually remove
rm -rf .claude/plugins/spec-driven-dev
```

### Remove Direct Copy

```bash
# Remove skills
rm -rf .claude/skills/spec-proposal-creation
rm -rf .claude/skills/spec-implementation
rm -rf .claude/skills/spec-archiving
rm -rf .claude/skills/spec-context-loading

# Or remove the entire directory
rm -rf .claude/skills
```

### Keep Your Specs

**Important:** Uninstalling the skills does NOT delete your `spec/` directory. Your specifications, proposals, and archives remain intact.

If you want to remove everything:

```bash
# Remove skills
rm -rf .claude/skills
rm -rf .claude/plugins/spec-driven-dev

# Remove specs (careful!)
rm -rf spec/
```

## Next Steps

After installation:

1. **Read [CLAUDE.md](CLAUDE.md)** for detailed usage instructions
2. **Check [README.md](README.md)** for workflow examples
3. **Try the quick start** walkthrough
4. **Create your first proposal** and see the workflow in action

## Getting Help

- **Documentation:** [README.md](README.md), [CLAUDE.md](CLAUDE.md)
- **Issues:** [GitHub Issues](https://github.com/mahidalhan/specd-out-skills/issues)
- **OpenSpec:** [OpenSpec Documentation](https://github.com/Fission-AI/OpenSpec) (methodology reference)
- **Claude Code:** [Official Docs](https://docs.claude.com/en/docs/claude-code/overview)

---

**Happy spec-driven developing!** 🚀
