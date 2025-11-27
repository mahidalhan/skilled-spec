# Testing Strategies

Test-first development strategies for spec-driven implementation.

## Test-Driven Development Flow

```
1. Write Test (Red) → Test fails
2. Write Code (Green) → Test passes
3. Refactor → Tests still pass
4. Repeat
```

## Testing Hierarchy

### Unit Tests (Fastest)
- Test individual functions/methods
- No external dependencies
- Run in milliseconds
- Highest coverage

```python
def test_calculate_total():
    assert calculate_total([10, 20, 30]) == 60
    assert calculate_total([]) == 0
```

### Integration Tests (Medium)
- Test component interactions
- May use test database
- Run in seconds
- Verify contracts

```python
def test_user_registration():
    user = User.create(email="test@example.com")
    assert user.id is not None
    assert User.find_by_email("test@example.com") == user
```

### End-to-End Tests (Slowest)
- Test full user workflows
- Use real systems
- Run in minutes
- Catch integration issues

```python
def test_complete_checkout_flow():
    # Add to cart → Checkout → Payment → Confirmation
    ...
```

## Test Organization

### By Feature
```
tests/
  auth/
    test_login.py
    test_registration.py
  orders/
    test_create_order.py
    test_update_order.py
```

### Test Naming Convention
```python
# Pattern: test_{what}_{condition}_{expected}
test_login_valid_credentials_succeeds()
test_login_invalid_password_fails()
test_login_locked_account_blocked()
```

## Scenario-Driven Testing

Map EARS scenarios directly to tests:

**Requirement Scenario**:
```markdown
#### Scenario: Successful Login
GIVEN a registered user
WHEN submitting valid credentials
THEN system creates session
```

**Test**:
```python
def test_login_valid_credentials_creates_session():
    # GIVEN
    user = create_user(email="test@example.com", password="pass123")

    # WHEN
    session = login(email="test@example.com", password="pass123")

    # THEN
    assert session is not None
    assert session.user_id == user.id
```

## Testing Strategies by Task Type

### New Feature
1. Write acceptance test (E2E)
2. Write integration tests
3. Write unit tests
4. Implement feature
5. All tests pass

### Bug Fix
1. Write test that reproduces bug
2. Verify test fails
3. Fix bug
4. Verify test passes
5. Add regression test

### Refactoring
1. Ensure existing tests pass
2. Refactor code
3. Verify all tests still pass
4. No new tests needed (behavior unchanged)

## Quick Reference

| Test Type | Speed | Scope | When to Use |
|-----------|-------|-------|-------------|
| Unit | Fast | Single function | Always |
| Integration | Medium | Multiple components | Feature boundaries |
| E2E | Slow | Full workflow | Critical paths |

**Ratio**: 70% unit, 20% integration, 10% E2E
