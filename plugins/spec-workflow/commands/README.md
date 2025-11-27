# Spec Workflow Commands

## orchestrate.md

**Purpose**: Multi-task coordination with parallel execution support

**Usage**: `/orchestrate {task description}`

**When to Use**:
- Multiple independent tasks need execution
- Want to save time by running tasks in parallel
- Tasks have no dependencies between them

**Examples**:
```bash
/orchestrate Update docs, add tests, and update changelog

/orchestrate Implement these API endpoints in parallel:
- GET /users
- POST /users
- DELETE /users/{id}
```

**See Also**: ORCHESTRATION.md for detailed usage guide

## How Commands Work

Commands in this plugin extend Claude Code with custom shortcuts. When you type `/orchestrate`, Claude loads the orchestrate.md file which contains detailed instructions for task coordination.

Commands are automatically available after plugin installation.
