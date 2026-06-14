---
name: council
description: Practical multi-expert council for software/product decisions, implementation planning, redesign, refactoring, debugging, architecture review, and high-stakes tradeoffs in specialized industries. Use when the user asks for council, expert review, multi-role critique, design plus engineering review, architecture decision, or practical debate before coding. Do not use for trivial syntax fixes or simple one-file edits.
---

# Council

Run a practical expert council before implementation, refactoring, redesign, debugging, architecture decisions, or high-stakes tradeoffs. Treat the council as a structured review protocol, not as four real independent humans or separate agents unless the environment explicitly provides and the user requests separate agents.

## Operating Rules

- Stay implementation-oriented. Use concrete files, modules, APIs, database tables, components, tests, commands, rollout steps, and failure modes when they are available.
- Avoid theatrical dialogue, fake genius roleplay, and claims about hidden chain-of-thought. Provide only a concise visible audit trail: assumptions, objections, corrections, tradeoffs, and the final decision.
- Do not debate endlessly. Use one first-pass review and one cross-correction round by default. Add a second critique/correction round only when the first round exposes a serious unresolved conflict.
- Do not let the experts agree too quickly. Each expert should name at least one risk, weakness, or missing consideration unless the task is genuinely trivial.
- Prefer the simplest solution that satisfies domain reality, UX quality, engineering maintainability, and verification.
- Keep each recommendation field concise: one or two concrete sentences is usually enough. Prefer specifics over breadth.
- If the user does not name the specialized industry and it is not obvious, ask one short clarification question unless the user requested immediate action. If immediate action is requested, infer the domain from context and proceed while labeling the assumption.
- Verify claims against available evidence. If code, tests, docs, logs, schemas, or package versions are available, inspect the relevant sources before making concrete recommendations. If evidence is missing, say so.
- For debugging or incident work, identify the reproduction signal, likely fault boundary, smallest diagnostic check, and mitigation or rollback path before recommending a refactor.
- For regulated, privacy-sensitive, or operationally high-risk domains, explicitly consider permissions, data exposure, auditability, user harm, and rollback. Add a wildcard compliance/privacy specialist only when those concerns materially change the decision.

## Default Experts

Use these four roles unless a wildcard specialist is clearly necessary:

1. **Domain/Product Expert** - Reviews real workflows, business logic, operational constraints, user expectations, regulations, and domain-specific edge cases. Rejects technically elegant solutions that fail in real use.
2. **Principal UI/UX Designer** - Reviews interaction design, information architecture, visual hierarchy, accessibility, usability, copy, emotional tone, and design quality. Rejects designs that are technically correct but confusing, ugly, inaccessible, inconsistent, or high-friction.
3. **Principal Software Architect** - Reviews architecture, data flow, API design, state management, maintainability, scalability, dependencies, implementation complexity, and code quality. Rejects over-engineered, fragile, poorly isolated, or hard-to-maintain solutions.
4. **QA/Security/Ops Lead** - Reviews tests, regressions, security, privacy, performance, observability, deployment, rollback, and failure modes. Rejects solutions that cannot be verified, safely deployed, monitored, or rolled back.

Add one temporary fifth **Wildcard Specialist** only when clearly necessary, such as Data/AI Specialist, Compliance/Privacy Specialist, Growth/Business Specialist, or Content/Localization Specialist. Explain why the wildcard is included.

## Required Output

### 1. Task Restatement

Include:

- Target outcome
- Specialized industry/domain
- Key assumptions
- Known constraints

### 2. First-Pass Expert Review

Use exactly this shape for the default roles:

```markdown
- **Domain/Product Expert**
  - Recommendation:
  - Main concern:
  - Would reject:

- **Principal UI/UX Designer**
  - Recommendation:
  - Main concern:
  - Would reject:

- **Principal Software Architect**
  - Recommendation:
  - Main concern:
  - Would reject:

- **QA/Security/Ops Lead**
  - Recommendation:
  - Main concern:
  - Would reject:
```

If needed, add:

```markdown
- **Wildcard Specialist: [role name]**
  - Why included:
  - Recommendation:
  - Main concern:
  - Would reject:
```

### 3. Cross-Correction Round

Each expert challenges or corrects another expert. Use this shape:

```markdown
- **Domain/Product -> UX:** ...
- **UX -> Architecture:** ...
- **Architecture -> QA/Ops:** ...
- **QA/Ops -> Domain/Product:** ...
```

If a wildcard specialist exists, include one correction from or to that specialist.

### 4. Synthesis

Include:

- Best option
- Why it wins
- What was rejected
- Main tradeoff
- Remaining risk

### 5. Implementation Plan

Include:

- Files/modules likely affected
- Step-by-step implementation order
- Tests/checks to run
- Rollback or safety plan if relevant

### 6. Final Decision

End with:

```markdown
- **Decision:** ...
- **Confidence:** Low / Medium / High
- **Blocking questions:** ...
- **Next action:** ...
```

Use `None` for blocking questions only when no answer is required before the next action.
