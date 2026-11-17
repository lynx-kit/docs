> For AI agents: the complete documentation index is available at /lynx-kit/llms.txt, the full documentation bundle is available at /lynx-kit/llms-full.txt.

# Quick start

Show your first modal in a few minutes.


### Install and configure
Follow [Installation](/lynx-kit/guide/get-started/installation.md) to add `@lynx-kit/modal` and the
`source.include` entry.
### Add the modal to a page
Keep the open state in your component and render `<Modal>` at the root of the page:
```tsx title="src/App.tsx"
import { useState } from '@lynx-js/react';
import { Modal } from '@lynx-kit/modal';

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <view
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <view
        style={{ padding: '12px 24px', borderRadius: '16px', backgroundColor: '#6366f1' }}
        bindtap={() => setOpen(true)}
      >
        <text style={{ color: '#ffffff' }}>Show modal</text>
      </view>

      <Modal
        visible={open}
        onClose={() => setOpen(false)}
        title="Delete project?"
        description="This action can't be undone."
        confirmText="Delete"
        accentColor="#ef4444"
        onConfirm={() => setOpen(false)}
      />
    </view>
  );
}
```
### Run it
```bash
pnpm dev
```
Scan the QR code with Lynx Explorer and tap the button.

## Things to know

- **Controlled component.** `onConfirm` does not close the modal. Your code decides what happens, and
  you close it by setting `visible` to `false`.
- **Tap handlers.** Lynx uses `bindtap`, not `onClick`.
- **Render at the page root.** Lynx has no portals, so the overlay covers whichever view it is
  rendered in. Place `<Modal>` near the top of your page component.
- **Layout.** A Lynx `view` uses a linear layout by default, so set `display: 'flex'` when you
  want `align-items` to apply. See [Troubleshooting](/lynx-kit/guide/troubleshooting.md).

Next, read the full [Modal API](/lynx-kit/apis/modal.md).
