# Spec Delta: {Capability Name}

This file contains specification changes for `spec/specs/{capability}/spec.md`.

## ADDED Requirements

### Requirement: {Requirement Name}
{WHEN/IF clause describing trigger}
the system SHALL {action and outcome}.

#### Scenario: {Positive Scenario Name}
GIVEN {preconditions}
WHEN {action}
THEN {expected outcome}
AND {additional outcome}

#### Scenario: {Error Scenario Name}
GIVEN {error preconditions}
WHEN {action}
THEN {expected error handling}

---

## MODIFIED Requirements

### Requirement: {Existing Requirement Name}
**Previous**: {Brief summary of old behavior}

{Complete updated requirement text in EARS format}
WHEN {trigger},
the system SHALL {new action and outcome}.

#### Scenario: {Updated Scenario Name}
GIVEN {new preconditions}
WHEN {action}
THEN {new expected outcome}

---

## REMOVED Requirements

### Requirement: {Deprecated Requirement Name}
**Reason for removal**: {Why this is being deprecated}

**Migration path**: {How users should adapt}

---

## Notes

- Use ADDED for completely new capabilities
- Use MODIFIED when changing existing behavior (include full updated text)
- Use REMOVED for deprecated features
- Always include scenarios for each requirement
- Consider both positive and error cases
