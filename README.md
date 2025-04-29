# Vite + VanillaJS Template

A lightweight, multi-page starter template using [Vite](https://vitejs.dev/), Vanilla JavaScript, and SASS — built for fast development and easy deployment on GitHub Pages.

---

## 🚀 Features

- ⚡️ Vite-powered build and dev server
- 📆 Multi-page setup (`index.html`, `pages/test.html`)
- 🎨 SASS support with organized structure (`base/`, `components/`)
- 🤩 WASM + top-level await support
- 🔗 Node polyfills for browser environments
- 📁 Public assets & custom `CNAME` support for custom domain
- 🌐 Deployable via `gh-pages`

---

## 🧱 Folder Structure

```
.
├── public/              # Static assets (served as-is)
├── pages/               # Extra pages (like test.html)
├── src/                 # Source files
│   ├── assets/
│   │   ├── fonts/
│   │   ├── img/
│   │   └── sass/
│   ├── core/            # App logic (e.g. App.js)
│   ├── test/            # Test files
│   └── main.js          # Entry point
├── index.html
├── vite.config.js
├── .env
└── package.json
```

---

## 🛠️ Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🌍 Deployment

This template uses [`gh-pages`](https://github.com/tschaub/gh-pages) for deploying to GitHub Pages.

To deploy:

```bash
npm run deploy
```

Make sure the `CNAME` file in `public/` has your custom domain (if needed).

---

## 📝 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**picinfiniti**  
GitHub: [@picinfiniti](https://github.com/picinfiniti)

plate using [Vite](https://vitejs.dev/), Vanilla JavaScript, and SASS —
