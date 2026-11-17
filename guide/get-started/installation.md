> For AI agents: the complete documentation index is available at /docs/llms.txt, the full documentation bundle is available at /docs/llms-full.txt.

# Installation

Lynx Kit components are published to npm under the `@lynx-kit` scope. Each component is its own
package, so you add only the ones you need.

## Requirements

- A Lynx app created with Rspeedy (`@lynx-js/rspeedy`) and ReactLynx (`@lynx-js/react`)
- `@lynx-js/react` 0.100.0 or newer
- `@lynx-js/types` 4 or newer
- `@types/react` 19 or newer

## Install the package


```sh [npm]
npm install @lynx-kit/modal
```

```sh [yarn]
yarn add @lynx-kit/modal
```

```sh [pnpm]
pnpm add @lynx-kit/modal
```

```sh [bun]
bun add @lynx-kit/modal
```

```sh [deno]
deno add npm:@lynx-kit/modal
```

## Compile the package source

The package ships JSX (`.jsx` files) so that ReactLynx can compile it for the main thread and the
background thread. Bundlers skip `node_modules` by default, so tell Rspeedy to include the package.
Add a `source.include` entry to `lynx.config.ts`:

```ts title="lynx.config.ts"
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';

export default defineConfig({
  source: {
    include: [/@lynx-kit/],
  },
  plugins: [pluginQRCode(), pluginReactLynx()],
});
```

Keep the plugins your project already has and only add the `source` block. Restart the dev server
after editing the config.

:::tip
Without this entry you will see a JSX syntax error that points into
`node_modules/@lynx-kit/modal`.
:::

## Tailwind is optional

The modal ships its own precompiled CSS, so your app does not need Tailwind. If your app does use
Tailwind, see [Styling and Theming](/docs/guide/styling.md) to learn how to combine them.

## Next step

Continue with the [Quick Start](/docs/guide/get-started/quick-start.md).
