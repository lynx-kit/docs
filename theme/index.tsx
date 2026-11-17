// @ts-nocheck
import { useEffect, useState } from 'react';
import { withBase, NoSSR } from '@rspress/core/runtime';
import {
  HomeLayout as BasicHomeLayout,
  PackageManagerTabs,
  SvgWrapper as OriginalSvgWrapper,
} from '@rspress/core/theme-original';
import HeroArt from './HeroArt';
import { COMPONENTS } from './components';

declare const __NPM_URL__: string;

function InstallBox() {
  const [selected, setSelected] = useState(0);
  const pkg = COMPONENTS[selected].pkg;

  return (
    <div className="lk-home-install">
      <p className="lk-home-install__label">Install a component</p>
      <div className="lk-home-install__picker" role="tablist" aria-label="Component">
        {COMPONENTS.map((c, i) => (
          <button
            key={c.pkg}
            type="button"
            role="tab"
            aria-selected={i === selected}
            className={
              'lk-home-install__chip' + (i === selected ? ' lk-home-install__chip--selected' : '')
            }
            onClick={() => setSelected(i)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <NoSSR>
        <PackageManagerTabs
          key={pkg}
          command={{
            npm: `npm install ${pkg}`,
            yarn: `yarn add ${pkg}`,
            pnpm: `pnpm add ${pkg}`,
            bun: `bun add ${pkg}`,
          }}
        />
      </NoSSR>
    </div>
  );
}

function HomeLayout() {
  useEffect(() => {
    // The hero "name" is the badge: link it to the npm org and show the component count.
    const brand = document.querySelector('.rp-home-hero__title-brand');
    if (brand) {
      const n = COMPONENTS.length;
      (brand as HTMLElement).innerHTML = `
        <a href="${__NPM_URL__}" target="_blank" rel="noreferrer">
          Public Beta · ${n} ${n === 1 ? 'component' : 'components'}
        </a>
      `;
    }
    // Highlight the word "Lynx" in the headline.
    const subtitle = document.querySelector('.rp-home-hero__subtitle');
    if (subtitle) {
      (subtitle as HTMLElement).innerHTML = 'UI components<br />for <span class="lk-hl">Lynx</span> apps';
    }
  }, []);

  return <BasicHomeLayout beforeHero={<HeroArt />} afterHeroActions={<InstallBox />} />;
}

/**
 * Rspress renders <img src={icon}> for file paths but does not prepend the
 * configured `base`, which breaks icons when the site is hosted under a sub-path.
 */
function SvgWrapper({ icon, ...rest }) {
  if (typeof icon === 'string' && icon.startsWith('/') && !icon.trim().startsWith('<')) {
    return <OriginalSvgWrapper icon={withBase(icon)} {...rest} />;
  }
  return <OriginalSvgWrapper icon={icon} {...rest} />;
}

export * from '@rspress/core/theme-original';
export { HomeLayout, SvgWrapper };
