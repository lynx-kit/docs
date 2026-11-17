> For AI agents: the complete documentation index is available at /lynx-kit/llms.txt, the full documentation bundle is available at /lynx-kit/llms-full.txt.

# API overview

## Components

| Package           | Component                        | Description                                                                                     |
| ----------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `@lynx-kit/modal` | [Modal](/lynx-kit/apis/modal.md) | A customizable, animated modal dialog with title, description, icon, custom content and actions |

## Conventions

These rules apply to every Lynx Kit component.

| Convention | Details                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| Controlled | State such as `visible` is owned by your code. Components call your callbacks and never change it themselves. |
| Events     | Lynx event names are used: `bindtap` and `catchtap`, not `onClick`.                                           |
| Colors     | Color props such as `accentColor` take any CSS color and are applied inline.                                  |
| Classes    | `className` props extend the defaults. Library classes use the `lk-` prefix.                                  |
| Types      | Every package ships `.d.ts` files and exports its props type, for example `ModalProps`.                       |
