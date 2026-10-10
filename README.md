# Vite + Vanilla JS Starter

A reusable, multi-page starter with vanilla JavaScript, indented Sass, and Vite. No framework required.

## Getting started

Use Node.js 24 LTS (recommended), or Node.js 22 starting at 22.13. With nvm:

```bash
nvm use
npm ci
npm run dev
```

Open the URL printed by Vite. The home page links to an example page at `/pages/test.html`.

When starting a project, change the package name, page titles, descriptions, favicon, and starter content. Run `npm install` after editing dependencies to update the lockfile.

## Commands

| Command                | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                     |
| `npm run build`        | Build all pages into `dist/`                                     |
| `npm run preview`      | Preview the production build locally                             |
| `npm run lint`         | Check JavaScript with ESLint                                     |
| `npm run lint:fix`     | Apply automatic lint fixes                                       |
| `npm run format`       | Format supported source and config files                         |
| `npm run format:check` | Check formatting without changing files                          |
| `npm test`             | Test deployment against temporary local Git repositories         |
| `npm run check`        | Run lint, formatting, deployment tests, and the production build |
| `npm run deploy`       | Check, build, and publish to the deployment branch               |

Prettier excludes indented `.sass` files because that syntax is unsupported. EditorConfig supplies their indentation and whitespace defaults. GitHub Actions runs `npm ci` and `npm run check` on pushes and pull requests; it does not deploy.

## Project structure

```text
index.html                 Home page
pages/                     Additional HTML pages
public/                    Static files copied unchanged to dist/
src/
  main.js                  Home page entry
  core/App.js              Application initialization
  pages/                   Page-specific JavaScript entries
  assets/
    sass/base/             Reset, variables, and font declarations
    sass/components/       Component styles
    fonts/                 Local Ubuntu fonts
    img/                   Image assets
scripts/deploy.mjs         Deployment command
scripts/lib/deploy.js      Deployment utility using Node and Git
tests/deploy.test.js       Deployment integration tests
vite.config.js             Build inputs, asset base, and @ alias
.env.example               Optional environment configuration
```

### Adding pages and components

Every `.html` file inside `pages/`, including nested folders, is automatically included in development and production. Add a module script pointing to its JavaScript entry, for example:

```html
<script type="module" src="/src/pages/about.js"></script>
```

Import shared styles in each entry that needs them. Initialize shared application behavior in `App.init()` and page-specific behavior in `src/pages/`. The `@` alias points to `src/`:

```js
import App from '@/core/App.js';
import '@/assets/sass/main.sass';
```

The custom context-menu stylesheet is an optional example. Remove its `@use` from `main.sass` if your project does not need it. Local fonts use `font-display: swap`; replace them or remove the fonts import if you prefer system fonts.

### Environment variables

Copy `.env.example` to `.env` when configuration is needed. `.env` and mode-specific environment files are ignored by Git.

- `BASE_PATH` controls the public URL prefix and defaults to `/`.
- Browser code can read `VITE_*` variables through `import.meta.env`, for example `import.meta.env.VITE_APP_NAME`. These values are public; never store secrets in them.
- Vite also provides `import.meta.env.DEV`, `PROD`, and `BASE_URL`.

Restart the dev server after changing environment files. Environment values are embedded at build time.

### WebAssembly and Node compatibility

Vite 8 supports WebAssembly ES module imports and native top-level await for its modern browser target, so separate WASM and top-level-await plugins are unnecessary:

```js
import { add } from './add.wasm';

console.log(add(1, 2));
```

Node polyfills are opt-in. For browser dependencies that use Node modules, `Buffer`, or `global`, install the plugin and add it to the config's returned object:

```bash
npm install -D vite-plugin-node-polyfills
```

```js
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// Add this `plugins` array to the returned Vite config.
const plugins = [
  nodePolyfills({
    globals: { Buffer: true, global: true },
    protocolImports: true,
  }),
];
```

Review the plugin's dependency advisories before enabling it. Polyfills do not turn the browser into a Node runtime; APIs such as filesystem access still require a server or a browser API.

## Deployment

Deploy the contents of `dist/` to any static host. `npm run preview` is for local checks, not a production server.

### Deploy with one command

```bash
npm run deploy
```

The bundled deployment utility uses Node's standard library and your existing Git authentication. It has no additional npm dependencies and does not use the `gh-pages` package.

On each run it:

1. Prints the configured remote and deployment branch, then runs `npm run check` (lint, formatting, tests, and build).
2. Validates `dist/`, requiring `index.html` and rejecting symlinks, special files, and Git metadata.
3. Copies the build into a temporary repository, adds `.nojekyll`, and preserves an optional `CNAME` from the build.
4. Creates a commit whose parent is the existing deployment commit, then pushes only the deployment branch. Identical output creates no new commit.
5. Removes the temporary repository after success or failure.

Your source branch, index, and working files are untouched by Git deployment operations. Project checks still rebuild `dist/`. No force push is used; conflicting concurrent deployments are rejected. The utility also refuses to publish over `main`, `master`, the current source branch, or the remote default branch. It never checks out files from the remote deployment branch. Only HTTPS, SSH, and local-file Git remotes are supported, and a remote must have exactly one push URL.

Keep Git up to date. Builds and package scripts execute your project's code, so deploy trusted projects and review what you place in `public/`; all regular files in `dist/` are published.

### One-time GitHub Pages setup

1. Ensure `origin` points to your project repository and Git has `user.name`, `user.email`, and working SSH or HTTPS credentials configured.
2. Set the asset prefix in `.env.production`:
   - **Project URL**, such as `https://username.github.io/my-project/`: use `BASE_PATH=/my-project/`.
   - **Root URL or custom domain**: use `BASE_PATH=/` (the default). For a custom domain, configure it in GitHub Pages settings and optionally add `public/CNAME` containing the domain.
3. Run `npm run deploy` to create the `gh-pages` branch.
4. In repository **Settings → Pages**, select **Deploy from a branch**, choose **gh-pages**, and select **/ (root)**. Subsequent deployments need only `npm run deploy`.

If you previously used the Actions deployment workflow, switch the Pages source to **Deploy from a branch**. The old deployment workflow has been removed; the CI workflow still checks pushes and pull requests.

The utility defaults to `origin` and `gh-pages`. To change them, add these values to `.env.production` or set environment variables:

```dotenv
DEPLOY_REMOTE=origin
DEPLOY_BRANCH=gh-pages
```

An existing deployment branch is updated without replacing its history. A failed build stops before publication. If a push is rejected, check authentication, permissions, and network access; for a concurrent deployment, rerun the command to build on the latest deployment commit. A successful push means the files reached the branch; GitHub Pages handles publication afterward.

Use `%BASE_URL%` in HTML links, as the starter pages do, and `import.meta.env.BASE_URL` for public asset URLs built in JavaScript. When using Vite's relative base option (`--base=./`), write page links relative to each HTML file instead.

See the [Vite deployment guide](https://vite.dev/guide/static-deploy.html) and [Vite features](https://vite.dev/guide/features) for hosting and browser support details.

## License

[MIT](./LICENSE). Created by [picinfiniti](https://github.com/picinfiniti).
