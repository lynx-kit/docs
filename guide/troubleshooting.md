> For AI agents: the complete documentation index is available at /lynx-kit/llms.txt, the full documentation bundle is available at /lynx-kit/llms-full.txt.

# Troubleshooting

## JSX syntax error from `node_modules/@lynx-kit/modal`

The package ships `.jsx` files and bundlers skip `node_modules` by default. Add the package to
`source.include` in your `lynx.config.ts`, then restart the dev server:

```ts
export default defineConfig({
  source: { include: [/@lynx-kit/] },
  // ...
});
```

## Items are not centered

A Lynx `view` defaults to `display: linear`, where `justify-content` works but `align-items` is
ignored. Set the display mode explicitly:

```tsx
<view
  style={{
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
```

If the view does not fill the screen, give the root element a defined size, since `flex: 1` needs a
sized parent.

## The modal does not close

`onConfirm` never closes the modal. Set `visible` to `false` in your handler:

```tsx
onConfirm={() => {
  save();
  setOpen(false);
}}
```

## Click handlers do nothing

Lynx uses `bindtap` and `catchtap`, not `onClick`.

## The modal is hidden behind other content

Lynx has no portals. Render `<Modal>` at the root of the page, not inside a scroll view or a
clipped container.

## `Can't resolve '@lynx-kit/modal'` in a monorepo

When you develop the library inside a pnpm workspace, check these in order:

1. The `name` field in `packages/modal/package.json` must be exactly `@lynx-kit/modal`. Run
   `pnpm ls -r --depth -1` to see the names pnpm uses.
2. The playground must depend on it: `"@lynx-kit/modal": "workspace:*"`.
3. Build output decides the entry. Check `dist` and make sure `main`, `types` and `exports` point at
   files that exist. See [Creating a component](/lynx-kit/guide/creating-a-component.md).
4. Restart the dev server after changing `package.json`, since resolution failures are cached.

## `npm` commands fail with `EBADDEVENGINES`

The repository declares pnpm as its package manager, so npm refuses to run inside it. Run `npm login`
and `npm org ls` from your home folder, and use `pnpm` for everything inside the repository.
