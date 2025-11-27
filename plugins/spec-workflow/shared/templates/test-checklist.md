# Test Checklist

Use this checklist to verify tests are complete before marking a task as done.

## Before Writing Tests

- [ ] Understand the requirement/scenario being tested
- [ ] Identify success criteria (what makes the test pass?)
- [ ] Determine test type needed (unit/integration/e2e)
- [ ] Set up test environment/fixtures

## Test Implementation

- [ ] Test fails initially (Red phase)
- [ ] Test name clearly describes what's being tested
- [ ] Test covers the happy path (success case)
- [ ] Test covers error cases
- [ ] Test covers edge cases
- [ ] Test is isolated (no dependencies on other tests)
- [ ] Test uses Given/When/Then structure

## After Implementation

- [ ] Test passes (Green phase)
- [ ] No console errors or warnings
- [ ] Test runs quickly (appropriate scope)
- [ ] Test can run repeatedly (idempotent)
- [ ] Test cleanup happens (no side effects)

## Coverage Checklist

- [ ] All scenarios from requirement have corresponding tests
- [ ] All code paths are tested
- [ ] Error handling is tested
- [ ] Boundary conditions tested (min/max values, empty inputs)
- [ ] Integration points tested

## Code Quality

- [ ] Test code follows project conventions
- [ ] Test data is realistic but anonymized
- [ ] Magic numbers replaced with named constants
- [ ] Complex setup extracted to helper functions
- [ ] Comments explain "why" not "what"

## Ready to Mark Complete

- [ ] All tests pass
- [ ] Coverage meets project standards (typically >80%)
- [ ] No skipped or pending tests
- [ ] CI pipeline passes
- [ ] Code review ready (if applicable)
