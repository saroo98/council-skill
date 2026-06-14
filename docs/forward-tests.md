# Forward Tests

These prompt-level forward tests exercise the Council protocol against realistic use cases. They are not claims about independent human review or separate subagents; they document expected behavior and the skill adjustments made after review.

## Test Matrix

| Case | Prompt | Expected Stress Point | Result |
| --- | --- | --- | --- |
| Healthcare redesign | `/council` with `Industry: urgent care scheduling software. Task: Review a same-day appointment redesign before implementation.` | Domain constraints should prevent a generic calendar answer. | Pass: the protocol requires domain workflows, operational constraints, UX review, architecture ownership, QA rollback, and privacy/security review. |
| Fintech onboarding | `/council` with `Industry: fintech onboarding. Task: Review this KYC workflow redesign for product, UX, architecture, security, and rollout risk.` | Compliance/privacy may be necessary but should not always become a fifth role. | Pass with caveat: the wildcard specialist rule allows Compliance/Privacy only when it materially changes the decision. |
| Legal dashboard architecture | `/council` with `Industry: legal case-management software. Task: Review this dashboard architecture before implementation.` | Should catch permissions, matter confidentiality, auditability, and dense UX risk. | Pass: default roles cover domain permissions, UX hierarchy, architecture isolation, and QA/security observability. |
| Production incident debugging | `/council` with `Industry: warehouse operations. Task: Debug intermittent inventory sync failures before refactoring the allocation service.` | Debugging should prioritize reproduction and mitigation over redesign. | Pass after adjustment: operating rules now call out reproduction signal, fault boundary, diagnostic check, and mitigation before refactor. |
| Risky refactor decision | `/council` with `Industry: dental clinic management software. Task: Decide whether to refactor booking availability before fixing double-booking reports.` | Should compare defer-vs-now tradeoffs and reject elegant but unsafe refactors. | Pass: synthesis and implementation plan force rejected options, main tradeoff, tests, and rollback plan. |
| AI/data specialist need | `/council` with `Industry: education software. Task: Review an AI-generated lesson feedback feature before implementation.` | Should add a wildcard only when AI behavior changes verification, privacy, or UX risk. | Pass: wildcard rule supports a temporary Data/AI Specialist with an explicit why-included field. |
| Content/localization need | `/council` with `Industry: public benefits enrollment. Task: Review multilingual eligibility form copy before redesign.` | UX and domain review may be insufficient without content/localization expertise. | Pass: wildcard rule supports Content/Localization when user comprehension affects correctness. |

## Adjustments Made

- Added debugging-specific guidance so production incidents do not become premature architecture debates.
- Added high-risk domain guidance so privacy, permissions, regulated workflows, and rollback concerns stay visible.
- Added concision guidance so first-pass expert review remains useful instead of becoming a long roleplay transcript.

## Acceptance Criteria

A Council response passes these tests when it:

- Restates the task, domain, assumptions, and constraints.
- Gives each default expert at least one concrete objection unless the task is genuinely trivial.
- Uses at most two critique/correction rounds.
- Adds no wildcard specialist unless the extra role materially changes the decision.
- Names practical implementation details when available.
- Ends with decision, confidence, blocking questions, and next action.
