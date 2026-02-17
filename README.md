# Lyncv

A free, frontend-only CV/Resume builder. No server needed. Your data stays in your browser.

## Features

- **No server required** - Everything runs in your browser
- **Privacy first** - All data stored locally in localStorage
- **2 professional templates** - Classic and Modern designs
- **Live preview** - See changes as you type
- **PDF export** - Download your CV as a PDF via browser print
- **Responsive** - Works on desktop, tablet, and mobile
- **Free forever** - Deploy as static files, zero hosting costs

## Tech Stack

- React + TypeScript + Vite
- TanStack Router (file-based routing)
- TanStack Form + Zod (form handling and validation)
- Tailwind CSS v4
- react-to-print (PDF export)

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The output is in `dist/` and can be deployed to any static hosting provider.

## Deploy to Codeberg Pages

1. Build the project: `pnpm build`
2. Push the contents of `dist/` to a `pages` branch on your Codeberg repo
3. Your site will be available at `https://<username>.codeberg.page/<repo>/`

## License

[MIT](LICENSE)
