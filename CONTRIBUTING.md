# Contributing

## Scope and style

Keep changes narrow, readable, and directly related to the public site or Worker. Follow the existing vanilla ESM style: two-space indentation, semicolons, focused lower-camel helper names, explicit validation, and self-explanatory code without comments that restate it.

Do not add one-time migrations, local-state importers, database snapshots, generated media, or unrelated dependencies to the public repository.

## Local checks

Before opening a pull request, run the checks that apply to your change:

```powershell
npm run check
npx wrangler deploy --dry-run
npm audit
git diff --check
```

For UI changes, run the local Worker and verify the affected route. Include a screenshot in the pull request when the visual result changes.

## Data, media, and role changes

- Explain each item-data correction and include a public source or clear evidence.
- Keep public item text suitable for a public website.
- Test media uploads and detail rendering when changing media handling.
- Treat staff roles, audit history, owner operations, and remote D1 mutations as maintainer-only work. Do not run a remote mutation tool unless the task explicitly requires it.

## Secrets and security

- Never commit `.env`, `.dev.vars`, credentials, OAuth secrets, owner keys, session secrets, or local database state.
- Use Cloudflare secrets for deployed credentials.
- Review [SECURITY.md](./SECURITY.md) for changes involving authentication, authorization, uploads, media, or request handling.

## Pull requests

Every pull request must state:

- what changed and why
- local checks performed
- affected routes or APIs
- any data or configuration impact
- screenshots for visible UI changes
