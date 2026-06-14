# Council Skill

Council is a reusable AI coding skill invoked as `/council`. It gives Codex, Claude Code, and similar coding agents a practical expert review protocol before implementation, refactoring, redesign, debugging, or architecture decisions.

Council is not four real independent humans and does not create separate agents by default. It is a structured review method that forces a coding agent to evaluate a decision through four useful lenses: domain/product reality, UI/UX quality, software architecture, and QA/security/operations.

## Why Use It

Use Council when a change has meaningful product, design, architecture, security, performance, operational, or domain-specific risk. It is meant to catch weak assumptions before code is written and to turn critique into a concrete implementation plan.

Council is practical, not philosophical. It should produce specific objections, tradeoffs, affected files, tests to run, rollout notes, and a final decision.

## When To Use

- Planning a feature before implementation
- Reviewing a redesign before building it
- Choosing between architecture options
- Refactoring code with product or operational risk
- Debugging a tricky issue with unclear root cause
- Reviewing workflows in specialized industries such as healthcare, legal, finance, education, logistics, retail, or internal operations

## When Not To Use

- Trivial syntax fixes
- Simple one-file edits with obvious behavior
- Pure formatting changes
- Tasks where the user only wants immediate mechanical execution
- Requests that need authoritative legal, medical, financial, or compliance advice

## Install For Codex

```bash
git clone https://github.com/<owner>/council-skill.git
cd council-skill
./install-codex.sh
```

This installs the skill to:

```text
$HOME/.agents/skills/council
```

## Install For Claude Code

```bash
git clone https://github.com/<owner>/council-skill.git
cd council-skill
./install-claude.sh
```

This installs the skill to:

```text
$HOME/.claude/skills/council
```

## Install Both

```bash
git clone https://github.com/<owner>/council-skill.git
cd council-skill
./install-both.sh
```

The install scripts back up an existing destination folder with a timestamp before replacing it.

## Invocation

```text
/council
```

Some Codex environments also support dollar-prefixed skill prompts:

```text
$council
```

## Example Prompts

```text
/council

Industry: dental clinic management software.
Task: Review the appointment booking redesign before implementation.
```

```text
/council

Industry: legal case-management software.
Task: Review this dashboard architecture before implementation.
```

```text
/council

Industry: warehouse operations.
Task: Decide whether to refactor the pick-list allocation flow now or after the inventory sync bug is fixed.
```

## Expected Output Shape

Council outputs:

1. Task restatement
2. First-pass expert review
3. Cross-correction round
4. Synthesis
5. Implementation plan
6. Final decision

The final decision ends with:

```markdown
- **Decision:** ...
- **Confidence:** Low / Medium / High
- **Blocking questions:** ...
- **Next action:** ...
```

## Safety And Limitations

Council improves review discipline, but it does not guarantee correctness. It can still miss things, misunderstand context, or overfit to incomplete information.

Users should verify important claims against source code, logs, tests, schemas, official documentation, and real user workflows. Run the relevant checks before shipping.

Council should not be treated as legal, medical, financial, or compliance authority. For regulated or high-stakes decisions, use it as a preparation aid and get qualified review.
