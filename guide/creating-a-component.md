> For AI agents: the complete documentation index is available at /lynx-kit/llms.txt, the full documentation bundle is available at /lynx-kit/llms-full.txt.

# Creating a component

This guide shows how `@lynx-kit/modal` was built, so you can add the next component to the kit
(a bottom sheet, a toast and so on) the same way. Every component is its own package in a pnpm
workspace, with a playground app to try it in.

## Workspace layout

```text
lynx-kit/
├─ package.json
├─ pnpm-workspace.yaml
├─ .changeset/
├─ packages/
│  └─ modal/          -> @lynx-kit/modal
└─ apps/
   ├─ playground/     -> an Rspeedy app used to try components
   └─ docs/           -> this website
```


### Create the workspace
```bash
mkdir lynx-kit && cd lynx-kit
pnpm init
mkdir packages apps
```
```yaml title="pnpm-workspace.yaml"
packages:
  - 'packages/*'
  - 'apps/*'
```
```json title="package.json (root)"
{
  "private": true,
  "scripts": {
    "build": "pnpm -r --filter './packages/*' build",
    "release": "pnpm build && changeset publish"
  }
}
```
```bash
pnpm add -Dw @changesets/cli && pnpm changeset init
```
In `.changeset/config.json`, set `"access": "public"`.
### Scaffold the library package
```bash
pnpm create @lynx-js/lynx@latest packages/modal --template rslib-react-ts
```
The template creates a Rslib project with a `Counter` example. Keep its `rslib.config.ts`: it must
keep `target: "web"`, preserve JSX and build in bundleless mode (`bundle: false`), so that `dist/`
keeps `import './styles.css'` and emits the CSS next to the JavaScript.
### Name the package
The template names the package after its folder (`modal`). pnpm links workspace packages by the
`name` field, so change it to the scoped name:
```json title="packages/modal/package.json"
{
  "name": "@lynx-kit/modal",
  "version": "0.1.0"
}
```
### Set up Tailwind v3 with a prefix
```bash
cd packages/modal
pnpm add -D tailwindcss@^3 @lynx-js/tailwind-preset
```
```js title="packages/modal/tailwind.config.mjs"
import lynxPreset from '@lynx-js/tailwind-preset';

export default {
  prefix: 'lk-',
  content: ['./src/**/*.{ts,tsx}'],
  presets: [lynxPreset],
};
```
```js title="packages/modal/postcss.config.mjs"
export default { plugins: { tailwindcss: {} } };
```
```css title="packages/modal/src/styles.css"
@tailwind base;
@tailwind utilities;
```
The library runs Tailwind at build time, so apps do not need to scan `node_modules` for class names.
The `lk-` prefix keeps the library's classes from clashing with the app's own.
### Write the component
Create `src/Modal.tsx`. Layout, color and typography come from `lk-` classes. Animation values live
in inline styles because they depend on state.
```tsx title="packages/modal/src/Modal.tsx"
import { useEffect, useState } from '@lynx-js/react';
import type { ReactNode } from '@lynx-js/react';
import './styles.css';

const DURATION = 240;

function usePresence(visible: boolean) {
  const [mounted, setMounted] = useState(visible);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      const t = setTimeout(() => setShown(true), 16);
      return () => clearTimeout(t);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), DURATION);
    return () => clearTimeout(t);
  }, [visible]);

  return { mounted, shown };
}

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  footer?: ReactNode;
  closeOnOverlayTap?: boolean;
  accentColor?: string;
  surfaceColor?: string;
  overlayColor?: string;
  className?: string;
  overlayClassName?: string;
}

export function Modal({
  visible,
  onClose,
  title,
  description,
  icon,
  children,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  footer,
  closeOnOverlayTap = true,
  accentColor,
  surfaceColor,
  overlayColor = 'rgba(10, 12, 24, 0.55)',
  className = '',
  overlayClassName = '',
}: ModalProps) {
  const { mounted, shown } = usePresence(visible);
  if (!mounted) return null;

  const accent = accentColor ? { backgroundColor: accentColor } : undefined;

  return (
    <view
      className={`lk-fixed lk-top-0 lk-left-0 lk-right-0 lk-bottom-0 lk-flex lk-flex-col lk-items-center lk-justify-center ${overlayClassName}`}
      style={{
        zIndex: 1000,
        backgroundColor: shown ? overlayColor : 'rgba(0, 0, 0, 0)',
        transition: `background-color ${DURATION}ms ease`,
      }}
      bindtap={() => closeOnOverlayTap && onClose()}
    >
      <view
        className={`lk-flex lk-flex-col lk-items-center lk-w-5/6 lk-px-6 lk-pt-7 lk-pb-5 lk-bg-white lk-rounded-3xl ${className}`}
        style={{
          maxWidth: '360px',
          ...(surfaceColor ? { backgroundColor: surfaceColor } : null),
          opacity: shown ? 1 : 0,
          transform: shown ? 'scale(1) translateY(0px)' : 'scale(0.92) translateY(16px)',
          transition: `opacity ${DURATION}ms ease, transform ${DURATION}ms ease`,
          boxShadow: '0 24px 60px rgba(10, 12, 24, 0.28)',
        }}
        catchtap={() => {}}
      >
        {icon && (
          <view
            className="lk-flex lk-items-center lk-justify-center lk-w-14 lk-h-14 lk-mb-4 lk-rounded-full lk-bg-indigo-500"
            style={accent}
          >
            {icon}
          </view>
        )}

        {title && (
          <text className="lk-text-xl lk-font-bold lk-text-center lk-text-slate-900">{title}</text>
        )}

        {description && (
          <text className="lk-mt-2 lk-text-sm lk-text-center lk-text-slate-500">{description}</text>
        )}

        {children && <view className="lk-w-full lk-mt-4">{children}</view>}

        {footer ?? (
          <view className="lk-flex lk-flex-row lk-gap-3 lk-w-full lk-mt-6">
            <view
              className="lk-flex lk-flex-1 lk-items-center lk-justify-center lk-h-12 lk-rounded-2xl lk-bg-slate-100"
              bindtap={onClose}
            >
              <text className="lk-text-base lk-font-semibold lk-text-slate-800">{cancelText}</text>
            </view>

            {confirmText && (
              <view
                className="lk-flex lk-flex-1 lk-items-center lk-justify-center lk-h-12 lk-rounded-2xl lk-bg-indigo-500"
                style={accent}
                bindtap={onConfirm}
              >
                <text className="lk-text-base lk-font-semibold lk-text-white">{confirmText}</text>
              </view>
            )}
          </view>
        )}
      </view>
    </view>
  );
}
```
Design notes:
- `usePresence` keeps the element mounted for `DURATION` after `visible` becomes `false`, so the exit
  animation can play. The 16 ms delay on enter lets the first frame render at the start values.
- The backdrop handles `bindtap` to close. The card uses `catchtap`, which stops the tap from
  bubbling to the backdrop.
- `onConfirm` does not close the modal. The parent owns the state, which is the more predictable
  controlled pattern.
### Export it
Use extensionless relative imports. The build keeps JSX, so the output files are `.jsx`, and a `.js`
extension in the import would point to a file that does not exist.
```ts title="packages/modal/src/index.ts"
export type { ModalProps } from './Modal';
export { Modal } from './Modal';
```
### Point the package at its output
Build once and look at what `dist` contains:
```bash
pnpm --filter "@lynx-kit/modal" build
```
With JSX preserved you get `index.jsx`, `Modal.jsx`, `styles.css` and the `.d.ts` files, so the entry
points must name `.jsx`:
```json title="packages/modal/package.json"
{
  "name": "@lynx-kit/modal",
  "version": "0.1.0",
  "description": "A customizable modal for Lynx apps, styled with Tailwind.",
  "license": "MIT",
  "keywords": ["lynx", "lynxjs", "reactlynx", "modal", "tailwindcss", "ui"],
  "type": "module",
  "sideEffects": ["**/*.css"],
  "main": "./dist/index.jsx",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.jsx",
      "default": "./dist/index.jsx"
    },
    "./package.json": "./package.json"
  },
  "files": ["dist", "README.md"],
  "publishConfig": { "access": "public" },
  "scripts": {
    "build": "rslib build",
    "dev": "rslib build --watch",
    "prepublishOnly": "pnpm build"
  },
  "peerDependencies": {
    "@lynx-js/react": ">=0.100.0",
    "@lynx-js/types": ">=4",
    "@types/react": ">=19"
  }
}
```
Keep the template's `devDependencies`. The `default` condition matters: Rspeedy builds an app twice
(a background layer and a main-thread layer), and an `exports` map with only `import` can fail to
resolve in one of them.
After the build, confirm that `dist/` contains a `.css` file with `lk-` classes and that the built
component still imports it.
### Try it in the playground
```bash
cd apps/playground
pnpm add @lynx-kit/modal --workspace
cd ../..
pnpm --filter "@lynx-kit/modal" build
pnpm --filter playground dev
```
The playground imports `dist/`, which does not update until you rebuild. Run
`pnpm --filter "@lynx-kit/modal" dev` in a second terminal for a watcher.
Start with the template's `Counter` to prove that the wiring works, then swap the export to `Modal`.

## Growing the kit

- **More components.** Add `packages/bottom-sheet`, `packages/toast` and so on, each published as
  `@lynx-kit/<name>`. When two packages share code such as `usePresence`, move it into
  `@lynx-kit/core`.
- **Starter app.** A future unscoped `create-lynx-kit` package could scaffold an Rspeedy app with
  Tailwind v3, the Lynx preset, PostCSS and `source.include` already configured.
- **Design tokens.** A shared `@lynx-kit/tailwind-preset` can hold brand colors and radii once there
  is more than one component.

Next, learn how to [publish to npm](/lynx-kit/guide/publishing.md).
