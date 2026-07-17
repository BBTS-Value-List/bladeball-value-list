# Security Policy

## Reporting a vulnerability

Do not report vulnerabilities in public issues, discussions, pull requests, or social posts. Email [bbtsl@pve.bio](mailto:bbtsl@pve.bio) instead.

Include the affected URL, endpoint, file, or commit; the required access level; safe reproduction steps; expected impact; and any relevant screenshots or request samples. Do not include credentials, session cookies, owner keys, OAuth tokens, or destructive proof-of-concept traffic.

## Scope

Security reports are especially relevant to:

- Discord OAuth, sessions, and role authorization
- owner-only operations and audit trails
- media upload, storage, and delivery
- Worker API routes, D1 access, rate limiting, and request validation
- security headers and content-security policy
- local-only helper files that could be committed by mistake, including `.dev.vars`, temp SQL helpers, and scratch exports

## Handling

The project aims to acknowledge valid reports within seven days. Fix timing depends on severity, impact, and reproducibility. Please avoid denial-of-service testing, production data changes, and public disclosure until a fix is available.

If a report depends on a local-only file or developer workflow, say so explicitly so the maintainer can verify whether the issue affects the public repository, the deployed site, or only a local checkout.
