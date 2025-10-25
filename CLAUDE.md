# Spec-Driven Development Skills

These instructions are for AI assistants working with spec-driven development.

## When to Use These Skills

**Planning features?** Use `spec-proposal-creation` when the request mentions:
- Planning, proposals, specs, or new features (words like "add", "create", "plan", "design")
- New capabilities, breaking changes, or architecture shifts
- Anything that needs structured requirements before coding

**Ready to build?** Use `spec-implementation` when:
- User says "implement", "build", or "apply" with a proposal/change name
- Implementation should follow test-driven development

**Deployed and done?** Use `spec-archiving` when:
- User says "archive", "merge specs", or "finalize"
- Change is implemented, tested, and deployed

**Need context?** Use `spec-context-loading` when:
- User asks "what specs exist?", "show changes", or "find specs"
- You need to understand existing specifications

## Core Workflow

ALWAYS follow this sequence:
1. **Propose** → Create structured specs (spec-proposal-creation)
2. **Implement** → Build with TDD (spec-implementation)
3. **Archive** → Merge and preserve (spec-archiving)

DO NOT skip stages. Each skill has detailed instructions in its SKILL.md file.

## Key Rules

- Use EARS format for requirements (WHEN...SHALL, GIVEN...WHEN...THEN)
- Validate with grep patterns before completion
- Use TodoWrite during implementation
- Never implement during proposal stage
- Never archive without IMPLEMENTED marker

Inspired by [OpenSpec](https://github.com/Fission-AI/OpenSpec)
