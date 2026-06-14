import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";

const requiredFiles = [
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  ".gitignore",
  ".gitattributes",
  "CONTRIBUTING.md",
  "SECURITY.md",
  ".github/workflows/ci.yml",
  ".github/workflows/pages.yml",
  ".github/ISSUE_TEMPLATE/bug_report.yml",
  ".github/ISSUE_TEMPLATE/feature_request.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/pull_request_template.md",
  "assets/readme-overview.svg",
  "skills/council/SKILL.md",
  "skills/council/agents/openai.yaml",
  "install-codex.sh",
  "install-claude.sh",
  "install-both.sh",
  "examples/codex-example.md",
  "examples/claude-example.md",
  "examples/output-example.md",
  "docs/forward-tests.md",
  "site/index.html",
  "site/styles.css",
  "site/robots.txt",
  "site/sitemap.xml",
  "site/404.html",
];

const expectedDescription =
  "Practical multi-expert council for software/product decisions, implementation planning, redesign, refactoring, debugging, architecture review, and high-stakes tradeoffs in specialized industries. Use when the user asks for council, expert review, multi-role critique, design plus engineering review, architecture decision, or practical debate before coding. Do not use for trivial syntax fixes or simple one-file edits.";

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

for (const file of requiredFiles) {
  assert(existsSync(file), `missing required file: ${file}`);
  assert(statSync(file).isFile(), `required path is not a file: ${file}`);
}

const skill = read("skills/council/SKILL.md");
assert(skill.startsWith("---\n"), "SKILL.md missing opening frontmatter");
const frontmatterEnd = skill.indexOf("\n---\n", 4);
assert(frontmatterEnd > 0, "SKILL.md missing closing frontmatter");
const frontmatter = skill.slice(4, frontmatterEnd).trim().split(/\r?\n/);
assert(frontmatter[0] === "name: council", "SKILL.md name frontmatter must be council");
assert(
  frontmatter[1] === `description: ${expectedDescription}`,
  "SKILL.md description frontmatter changed unexpectedly",
);
assert(frontmatter.length === 2, "SKILL.md frontmatter must only contain name and description");

const readme = read("README.md");
for (const text of [
  "assets/readme-overview.svg",
  "Council Skill for AI Coding Agents",
  "https://github.com/saroo98/council-skill.git",
  "https://saroo98.github.io/council-skill/",
  "Safety And Limitations",
]) {
  assert(readme.includes(text), `README missing expected text: ${text}`);
}

const openaiYaml = read("skills/council/agents/openai.yaml");
for (const text of [
  'display_name: "Council"',
  'short_description: "Expert review before coding"',
  'default_prompt: "Use $council to review this plan before implementation."',
]) {
  assert(openaiYaml.includes(text), `openai.yaml missing expected text: ${text}`);
}

for (const script of ["install-codex.sh", "install-claude.sh", "install-both.sh"]) {
  const contents = read(script);
  assert(contents.startsWith("#!/usr/bin/env bash\n"), `${script} must use bash shebang`);
  assert(contents.includes("set -euo pipefail"), `${script} must use set -euo pipefail`);
}

const modes = execFileSync("git", ["ls-files", "-s", "install-codex.sh", "install-claude.sh", "install-both.sh"], {
  encoding: "utf8",
});
for (const script of ["install-codex.sh", "install-claude.sh", "install-both.sh"]) {
  assert(modes.includes(`100755`) && modes.includes(script), `${script} must be executable in git index`);
}

const site = read("site/index.html");
for (const text of [
  "<title>Council Skill for Codex, Claude Code, and AI Coding Agents</title>",
  'name="description"',
  '<link rel="canonical" href="https://saroo98.github.io/council-skill/">',
  'application/ld+json',
]) {
  assert(site.includes(text), `site/index.html missing expected SEO text: ${text}`);
}

const forwardTests = read("docs/forward-tests.md");
const caseCount = (forwardTests.match(/\| .* \| `\/council`/g) || []).length;
assert(caseCount >= 5, "docs/forward-tests.md must include at least five prompt-level test cases");

const allTextFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .trim()
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((file) => !file.startsWith(".git/"));

for (const file of allTextFiles) {
  const contents = read(file);
  const todoMarker = "[TO" + "DO";
  const ownerMarker = "<ow" + "ner>";
  assert(!contents.includes(todoMarker), `${file} contains scaffold TODO marker`);
  assert(!contents.includes(ownerMarker), `${file} contains placeholder owner`);
}

console.log(`Validated ${requiredFiles.length} required files.`);
