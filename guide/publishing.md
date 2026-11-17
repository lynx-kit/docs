> For AI agents: the complete documentation index is available at /docs/llms.txt, the full documentation bundle is available at /docs/llms-full.txt.

# Publishing to npm

How to publish a package from the workspace to the `@lynx-kit` scope.

## Before the first publish

- `src/index.ts` exports the component you are shipping.
- `packages/<name>/README.md` has the install command, a props table and a usage example.
- `packages/<name>/LICENSE` contains the MIT license text. Without it the package declares a license
  it does not include.
- `pnpm --filter "@lynx-kit/<name>" build` succeeds and `dist/` contains the `.jsx`, `.d.ts` and
  `.css` files.

## Publish


### Turn on two-factor authentication
npm requires 2FA for publishing. On npmjs.com open **Account**, then **Two-Factor Authentication**,
and enable it with the **Authorization and publishing** level. Without it, the registry answers with
a `403 Forbidden` and never asks for a one-time code.
### Log in and confirm ownership
Run these from your home folder, not from the repository. The repository declares pnpm as its package
manager, so npm refuses to run inside it (`EBADDEVENGINES`).
```bash
cd ~
npm login
npm whoami
npm org ls lynx-kit
```
You should appear in the list with the `owner` role.
### Inspect what will ship
```bash
cd packages/modal
pnpm build
pnpm publish --dry-run --no-git-checks
```
The tarball should contain only `dist/`, `package.json`, `README.md` and `LICENSE`.
### Publish
```bash
npm publish --access public
```
npm opens a browser prompt (or asks for a one-time code). Scoped packages default to private, so
`--access public` is required. The `publishConfig` in `package.json` already sets it.
### Verify
```bash
cd ~
npm view @lynx-kit/modal
```
Then install it in a fresh Rspeedy app outside the monorepo and render it.

## Releasing a new version

Versions are permanent. You cannot republish a version number, so bump it first:

```bash
pnpm changeset          # pick the package, choose major, minor or patch, write a summary
pnpm changeset version  # bumps the version and writes CHANGELOG.md
```

Then publish again from the package folder.

## Giving your team access

After the first publish, open the organization's **Teams** page on npmjs.com, add the package to a
team and choose read-only or read/write. The package list stays empty until a package exists.

## Publishing from CI

npm is restricting tokens that bypass 2FA for direct publishing. When you automate releases, use
npm's trusted publishing (OIDC) from GitHub Actions instead of a long-lived token.

## Test the tarball before you publish

```bash
cd packages/modal
pnpm pack
```

In a fresh Rspeedy app run `pnpm add path/to/lynx-kit-modal-0.1.0.tgz`. If you hit a JSX error, add
`source.include` as described in [Installation](/docs/guide/get-started/installation.md).
