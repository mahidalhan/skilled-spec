# Task Execution Patterns

Patterns for executing implementation tasks using test-driven development.

## Basic Task Execution Flow

1. **Load Task**: Read task from proposal tasks.md
2. **Write Test First**: Create failing test that defines success
3. **Implement Minimum**: Write only code needed to pass test
4. **Verify**: Run test and confirm it passes
5. **Mark Complete**: Update TodoWrite status to completed

## TodoWrite Integration

### Task States
- `pending`: Not yet started
- `in_progress`: Currently working (only ONE task at a time)
- `completed`: Verified and done

### Update Pattern
```javascript
// Mark task as in_progress BEFORE starting work
TodoWrite([
  {content: "Implement user authentication", status: "in_progress", activeForm: "Implementing user authentication"},
  ...
])

// Do the work...

// Mark completed IMMEDIATELY after verification
TodoWrite([
  {content: "Implement user authentication", status: "completed", activeForm: "Implementing user authentication"},
  ...
])
```

## Test-First Patterns

### Pattern 1: Unit Test First
```python
# 1. Write failing test
def test_validate_email():
    assert validate_email("test@example.com") == True
    assert validate_email("invalid") == False

# 2. Run test (fails)
# 3. Implement function
def validate_email(email):
    return "@" in email and "." in email

# 4. Run test (passes)
# 5. Mark task complete
```

### Pattern 2: Integration Test First
```python
# 1. Write API test
def test_create_user():
    response = client.post("/users", json={"email": "test@example.com"})
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"

# 2. Implement endpoint
# 3. Verify test passes
```

## Sequential vs Parallel Tasks

### Sequential (Dependencies)
Execute one at a time:
```
Task 1: Create database schema → wait → complete
Task 2: Implement model → wait → complete
Task 3: Add API endpoint → wait → complete
```

### Parallel (Independent)
Use `orchestrate.md` for parallel execution:
```
Task A: Update documentation (independent)
Task B: Add unit tests (independent)
Task C: Update changelog (independent)

→ Launch all 3 in single message
→ Wait for all to complete
→ Continue with dependent tasks
```

## Common Task Types

### Database Changes
1. Write migration test
2. Create migration file
3. Run migration
4. Verify schema
5. Test rollback

### API Endpoints
1. Write API test (request/response)
2. Implement route handler
3. Add validation
4. Test error cases
5. Update API docs

### UI Components
1. Write component test
2. Create component
3. Add styling
4. Test interactions
4. Update storybook

## Verification Checklist

Before marking task complete:
- [ ] Test passes
- [ ] No new errors introduced
- [ ] Code follows project style
- [ ] Edge cases handled
- [ ] Documentation updated if needed
