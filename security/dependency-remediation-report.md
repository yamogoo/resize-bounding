# Dependency Remediation Report

## Scope and approach

Objective: reduce `pnpm audit` noise with minimal functional risk, prioritizing the published package surface over demo, playground, and deploy tooling.

Remediation strategy used:

- Upgrade top-level dependencies first.
- Add `pnpm.overrides` only where safe top-level upgrades were insufficient.
- Avoid major churn in the published packages unless clearly required.
- Treat demo, playground, and deploy-only alerts as lower priority than published/runtime risk.

## Initial vulnerability categories by surface area

Initial audit state: 55 advisories.

Published/runtime package surface:

- `packages/react/react-resize-bounding`
- `packages/vue/vue3-resize-bounding`
- No direct runtime vulnerability path was found in the shipped library dependencies.
- Most alerts touching these packages came from build-time dependencies such as `vite-plugin-dts`, Vite/Rollup/esbuild, and test/lint tooling.

Build and dev tooling only:

- `vite-plugin-dts`
- `vite`
- `esbuild`
- `@vue/test-utils`
- ESLint / TypeScript tooling
- Typical findings here included `validator`, `minimatch`, `vue-template-compiler`, and other transitive toolchain packages.

Demo, playground, and deploy only:

- `demo`
- `packages/react/playground/vite-app`
- `packages/vue/playground/vite-app`
- Netlify deploy tooling (`netlify-cli`) and Nuxt/Nitro/image stack produced the bulk of the remaining audit noise.

## Dependency upgrades performed

Top-level dependency upgrades:

- `demo/package.json`
  - `netlify-cli`: `^20.1.1` -> `^24.2.0`
- `packages/react/react-resize-bounding/package.json`
  - `netlify-cli`: `^21.6.0` -> `^24.2.0`
  - `vite-plugin-dts`: `^3.9.1` -> `^4.5.4`
  - `eslint`: `^8.57.1` -> `^9.39.4`
  - `@typescript-eslint/eslint-plugin`: `^7.18.0` -> `^8.57.0`
  - `@typescript-eslint/parser`: `^7.18.0` -> `^8.57.0`
- `packages/vue/vue3-resize-bounding/package.json`
  - `netlify-cli`: `^20.1.1` -> `^24.2.0`
  - `vite-plugin-dts`: `^3.9.1` -> `^4.5.4`
  - `vite`: `^5.4.21` -> `^6.4.1`
  - `@vitejs/plugin-vue`: `^5.2.4` -> `^6.0.5`
  - `vitest`: `^2.1.9` -> `^3.2.4`
  - `@vitest/ui`: `^2.1.9` -> `^3.2.4`
- `packages/vue/playground/vite-app/package.json`
  - `vite`: `^5.4.21` -> `^6.4.1`
  - `@vitejs/plugin-vue`: `^5.2.4` -> `^6.0.5`
  - `vitest`: `^2.1.9` -> `^3.2.4`
- `packages/react/playground/vite-app/package.json`
  - `vite`: `^5.4.20` -> `^5.4.21`
  - `eslint`: `^8.57.1` -> `^9.39.4`
  - `@typescript-eslint/eslint-plugin`: `^7.18.0` -> `^8.57.0`
  - `@typescript-eslint/parser`: `^7.18.0` -> `^8.57.0`
  - `eslint-plugin-react-hooks`: `^4.6.2` -> `^5.2.0`
  - `eslint-plugin-react-refresh`: `^0.4.20` -> `^0.4.26`

Upgrade intentionally not forced:

- `nuxt` in `demo` was investigated but not force-upgraded beyond the current safe line. The available path did not offer a clean, low-risk bump that resolved the remaining Nitro advisory without broader framework churn.

## Overrides added and why

Root `pnpm.overrides` added in `package.json`:

- `node-forge`: `1.3.3`
  - Patches vulnerable transitive versions without changing top-level package selection.
- `rollup`: `4.59.0`
  - Pulls in patched Rollup transitively where older sub-dependencies were vulnerable.
- `glob@10.4.5`: `10.5.0`
  - Safe patch-level transitive fix.
- `editorconfig@1.0.4`: `1.0.7`
  - Safe patch-level transitive fix.
- `diff@4.0.2`: `4.0.4`
  - Safe patch-level transitive fix.
- `minimatch@5.1.6`: `5.1.8`
  - Safe patch-level transitive fix.
- `minimatch@9.0.5`: `9.0.9`
  - Safe patch-level transitive fix.

These overrides were added only after top-level upgrades had already removed the larger, safer batch of advisories.

## Supporting code changes

Small code changes were required to keep validation green after the dependency updates:

- Updated one stale React inline snapshot after the package version changed from `1.1.0` to `1.1.2`.
- Adjusted React package and React playground lint compatibility for ESLint 9 while keeping existing `.eslintrc` config in place.
- Fixed a small number of lint issues surfaced by the newer ESLint/tooling versions.
- Corrected the Vue playground `ResizeBounding` spec so it matches the wrapper component's actual behavior.
- Changed the Vue playground `test:unit` script from watch mode to `vitest run` so `pnpm build` can complete non-interactively.

No functional changes were intentionally introduced to the published runtime behavior.

## Validation commands and results

Commands run:

- `pnpm install`
- `pnpm audit --json`
- `pnpm outdated`
- `pnpm -r why minimatch`
- `pnpm -r why tar`
- `pnpm -r why vite`
- `pnpm -r why esbuild`
- `pnpm -r why node-forge`
- `pnpm -r why serialize-javascript`
- `pnpm --filter react-resize-bounding build`
- `pnpm --filter vue3-resize-bounding build`
- `pnpm --filter resize-bounding-demo build`
- `pnpm test:unit`
- `pnpm --filter react-resize-bounding lint`
- `pnpm --filter ./packages/react/playground/vite-app lint`
- `pnpm --filter resize-bounding-demo lint`
- `pnpm --filter vue3-resize-bounding exec vitest run`
- `pnpm --filter ./packages/vue/playground/vite-app build`
- `pnpm --filter vue3-resize-bounding docs:build`

Results:

- Install succeeded.
- React published package build succeeded.
- Vue published package build succeeded.
- Demo build succeeded.
- Unit tests passed across the workspace after the React snapshot refresh.
- React package lint passed.
- React playground lint passed.
- Demo lint exited successfully with existing warnings only.

Audit reduction:

- Initial advisories: `55`
- Final advisories: `4`

## Remaining alerts

### Runtime / published risk

None identified in the shipped library runtime surface after remediation.

### Build-time only

- `esbuild` moderate
  - Representative audit path: `packages__react__playground__vite-app>vite>esbuild`
  - Scope: React playground build/dev tooling only, not part of the published package runtime.
  - Reason left: clearing this would require a separate React-side Vite upgrade batch.

### Demo / playground / deploy only

- `serialize-javascript` high
  - Path: `demo>nuxt>@nuxt/nitro-server>nitropack>@rollup/plugin-terser>serialize-javascript`
  - Scope: demo Nuxt build/deploy path only.
  - Reason left: trapped under current Nuxt/Nitro dependency selection; forcing it out would require riskier framework churn.

- `file-type` moderate
  - Path: `demo>netlify-cli>gh-release-fetch>@xhmikosr/downloader>file-type`
  - Scope: Netlify CLI only.
  - Reason left: internal Netlify CLI dependency chain; not part of the published package runtime.

- `yauzl` moderate
  - Path: `demo>netlify-cli>extract-zip>yauzl`
  - Scope: Netlify CLI only.
  - Reason left: internal Netlify CLI dependency chain; not part of the published package runtime.

## Assessment of remaining risk

- The published/runtime library surface is materially cleaner and does not retain known audit findings from the final audit output.
- Remaining alerts are isolated to demo, deploy, or playground tooling.
- Forcing the last four issues out would require higher-risk upgrades than the value justified for this pass.

## Recommended follow-up cleanup

- Revisit the demo's Nuxt/Nitro stack when a safe upgrade path is available that removes the `serialize-javascript` advisory.
- Consider whether `netlify-cli` is necessary as an installed workspace dependency, or whether deploy workflows can move behind CI-only tooling to reduce local audit noise further.
- Consider a future Vite major upgrade in the React playground when broader tooling churn is acceptable.
- Consider a separate React-side Vite/Vitest upgrade pass to remove the last remaining `esbuild` advisory.
- Migrate legacy ESLint config to flat config in a separate maintenance pass; current lint is green, but the warning will remain on ESLint 9.
