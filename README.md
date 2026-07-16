# BBTSL Blade Ball Value List

BBTSL is a public Blade Ball value-list site served by a Cloudflare Worker. It provides a searchable item catalogue, media-backed item details, Discord sign-in, and role-gated staff tools.

## Architecture

- `public/` contains the static site, including the value list and public team directory.
- `src/worker.js` serves the site and API, handles Discord OAuth, sessions, authorization, D1 access, media delivery, and security headers.
- Cloudflare D1 stores item, media, user, role, audit, and rate-limit data. Sessions are signed cookies.
- `scripts/generate-secret-token.mjs` generates a high-entropy value for a Worker secret.

## Requirements

- Node.js 20 or newer
- npm
- Cloudflare access only when deploying or using remote resources

## Local development

```powershell
npm install
npm run cf:dev
```

The local Worker listens on the URL printed by Wrangler. It uses local D1 state unless Wrangler is explicitly instructed otherwise.

## Validation

```powershell
npm run check
npx wrangler deploy --dry-run
npm audit
```

## Configuration and secrets

Copy the placeholders in [.env.example](./.env.example) into a local `.dev.vars` file for local development. Never commit `.dev.vars`, `.env`, real credentials, session material, owner keys, or OAuth secrets.

The Worker requires these values:

- `ADMIN_SESSION_SECRET`
- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_REDIRECT_URI` — an HTTPS Discord OAuth callback URL

Public runtime values such as `PUBLIC_SITE_URL` and `SITE_NAME` belong in `wrangler.jsonc`. Put sensitive Worker values in Cloudflare secrets for deployments. `DISCORD_BOT_TOKEN` remains a local integration placeholder and is not used or accepted by this Worker.

Generate a new random secret value with:

```powershell
npm run secrets:generate
```

## Bot API

Discord bots can read the public API directly from `https://bbtsl.lol`. It is a versioned, read-only API and does not use `DISCORD_BOT_TOKEN`, Discord OAuth cookies, or the site staff endpoints. Do not send a bot token to this Worker.

| Endpoint | Purpose |
| --- | --- |
| `GET /api/v1/health` | Service health and API version. |
| `GET /api/v1/swords` | Paginated value-list records. |
| `GET /api/v1/swords/%23ABC123` | One record by its immutable card ID. URL-encode the `#`. |
| `GET /api/v1/team` | Active public team directory. |

`/api/v1/swords` accepts optional `category`, `search`, `sort`, `limit`, and `offset` parameters. Valid sort values are `value-desc`, `value-asc`, `name-asc`, and `updated-desc`. `limit` defaults to 50 and is capped at 100. List responses use `{ "data": [...], "meta": { "total", "limit", "offset" } }`; single-record responses use `{ "data": {...} }`; failures use `{ "error": "..." }`.

The public API is rate-limited to 120 requests per minute per client and cached for up to 60 seconds. It does not send permissive CORS headers because Discord bots should call it from their server process, not browser JavaScript.

## Contributor guidance

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. Use the issue forms for public bugs, feature requests, and data corrections. Do not report vulnerabilities publicly; follow [SECURITY.md](./SECURITY.md).

## Public links

- Repository: [BBTS-Value-List/BBTSL-Website](https://github.com/BBTS-Value-List/BBTSL-Website)
- Live site: [bbtsl.lol](https://bbtsl.lol)
- Blade Ball experience: [Roblox](https://www.roblox.com/games/13772394625/Blade-Ball)

## Legal

BBTSL is an unofficial fan project and is not affiliated with Roblox, Blade Ball, or their owners. Read the live [Privacy Policy](https://bbtsl.lol/privacy), [Terms of Service](https://bbtsl.lol/terms), and [legal notice](./LEGAL.md) for data handling, terms, and rights concerns.
