# Security Policy

## Supported Versions

Council is a small instruction-only skill repository. Security fixes should target the latest `main` branch and the latest published release.

## Reporting A Vulnerability

Please do not open a public issue for a vulnerability.

Use GitHub private vulnerability reporting if it is available for this repository. If it is not available, contact the repository owner through GitHub and share only the minimum details needed to establish a private reporting channel.

## Scope

Security-relevant issues may include:

- Install script behavior that can overwrite unrelated files
- Unsafe shell handling
- Instructions that encourage leaking secrets or private data
- Documentation that recommends insecure usage
- GitHub Actions workflow permissions that are broader than needed

Out of scope:

- General prompt quality feedback without a security impact
- SEO or documentation preferences
- Vulnerabilities in third-party AI coding agents
