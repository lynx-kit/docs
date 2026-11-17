/**
 * Every published Lynx Kit component.
 *
 * The home page install box, the component picker and the "Public Beta" badge all read
 * from this list. When you publish a new component, add one entry here.
 */
export interface KitComponent {
  /** Label shown in the picker. */
  name: string;
  /** npm package name. */
  pkg: string;
}

export const COMPONENTS: KitComponent[] = [
  { name: 'Modal', pkg: '@lynx-kit/modal' },
  // { name: 'Bottom Sheet', pkg: '@lynx-kit/bottom-sheet' },
];
