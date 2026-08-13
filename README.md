<p align="center">
  <a href="https://squircle.spaceui.one" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://squircle.spaceui.one/logo.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://squircle.spaceui.one/logo.svg">
      <img alt="Space UI logo" src="https://squircle.spaceui.one/logo.svg" width="100" />
    </picture>
  </a>
</p>

<h1 align="center">
  @usespaceui/squircle
</h1>

<p align="center">
  Figma • iOS style corner smoothing using CSS Houdini Paint Worklet.
</p>

<p align="center">
  <a href="https://squircle.spaceui.one">Preview</a> • 
  <a href="https://github.com/usespaceui/squircle">Source Code</a> • 
  <a href="https://www.spaceui.one">SpaceUI.one</a>
</p>

<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=usespaceui">
    <img src="https://img.shields.io/twitter/follow/usespaceui.svg?label=Follow%20@usespaceui" alt="Follow @usespaceui" />
  </a>
</p>

<div align="center">
  <a href="https://www.npmjs.com/package/@usespaceui/squircle">
    <img src="https://img.shields.io/npm/v/@usespaceui/squircle?color=%23fa6400&label=version" />
  </a>
  <a href="https://www.npmjs.com/package/@usespaceui/squircle">
    <img src="https://img.shields.io/npm/unpacked-size/%40usespaceui%2Fsquircle?label=install%20size">
  </a>
  <a href="https://www.npmjs.com/package/@usespaceui/squircle">
    <img src="https://img.shields.io/bundlejs/size/%40usespaceui%2Fsquircle?format=min">
  </a>
  <a href="https://www.npmjs.com/package/@usespaceui/squircle">
    <img src="https://img.shields.io/bundlejs/size/%40usespaceui%2Fsquircle">
  </a>
  <a href="https://github.com/usespaceui/squircle">
    <img src="https://img.shields.io/github/repo-size/usespaceui/squircle">
  </a>
  <a href="https://www.npmjs.com/package/@usespaceui/squircle">
    <img src="https://img.shields.io/npm/dm/@usespaceui/squircle" />
  </a>
  <a href="https://github.com/usespaceui/squircle/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@usespaceui/squircle" />
  </a>
  <br><br>
</div>

---

## ✨ Overview

`@usespaceui/squircle` brings iOS-style squircles (mathematically perfect superellipses) to your Tailwind CSS projects. It mimics the continuous curvature corners found in Figma and Apple devices.
By utilizing the CSS Houdini Paint Worklet API, it provides a native-like performance and seamlessly integrates with Tailwind CSS.

---

## 📦 Installation

```bash
pnpm add @usespaceui/squircle
# or
npm install @usespaceui/squircle
# or
yarn add @usespaceui/squircle
```

Zero dependencies. Add the plugin to your Tailwind configuration or import it directly (Tailwind).

---

## 🚀 Setup

Because the plugin relies on a CSS Houdini worklet to draw the shape, you must initialize the script once in your app.

### With React / Next.js

Since the worklet interacts with the browser DOM, initialize it inside a Client Component provider.

```tsx
// components/SquircleProvider.tsx
'use client'
import * as React from 'react'
import { initSquircle } from '@usespaceui/squircle'

export function SquircleProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    initSquircle()
  }, [])

  return <>{children}</>
}
```

Wrap your root layout:

```tsx
import { SquircleProvider } from './SquircleProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SquircleProvider>{children}</SquircleProvider>
      </body>
    </html>
  )
}
```

### With Vanilla JS

Initialize the worklet directly in your client-side entry file:

```js
import { initSquircle } from '@usespaceui/squircle'

if (typeof window !== 'undefined') {
  initSquircle()
}
```

## Configure Tailwind CSS 4

Add the squircle plugin to your `tailwind.config.ts`.

```css
@import '@usespaceui/squircle';
```

### Configure Tailwind CSS 3

Add the squircle plugin to your `tailwind.config.js` or `tailwind.config.ts`.

```ts
import squirclePlugin from '@usespaceui/squircle'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [squirclePlugin],
}
```

---

## 🎨 Usage

### 1. Sizing

The plugin generates squircle utilities based on your existing Tailwind `borderRadius` theme. If your Tailwind config has `rounded-2xl`, you automatically have `squircle-2xl`.

```html
<div class="squircle-md p-4 bg-black text-white">Space UI Squircle!</div>
<div class="squircle-2xl">...</div>
<div class="squircle-full">...</div>
<!-- Automatically clamped to pill/circle -->

<!-- Arbitrary values are fully supported -->
<div class="squircle-[40px]">...</div>
```

### 2. Smoothing Intensity

By default, the plugin applies a **60% smooth transition** between the straight edge and the corner arc, perfectly matching Apple and Figma's native smoothing.

You can adjust this intensity using modifiers (`/0`, `/20`, `/40`, `/60`, `/80`, `/100`).

```html
<!-- Maximum smoothing -->
<div class="squircle-2xl/100">...</div>

<!-- Minimal smoothing (closer to a plain rounded rectangle) -->
<div class="squircle-2xl/20">...</div>

<!-- Arbitrary smoothing -->
<div class="squircle-2xl/[25]">...</div>
```

### 3. Native Borders (The Magic)

Use standard Tailwind border utilities. The Houdini worklet reads your native CSS border classes and draws the squircle border perfectly. No workarounds needed.

```html
<!-- 8px red border -->
<div class="squircle-2xl border-8 border-red-500 bg-black">...</div>

<!-- 1px semi-transparent blue border -->
<div class="squircle-[30px] border border-blue-500/50 bg-white">...</div>
```

> **Note on border placement:**
> By default, the plugin draws the border **outside** the element (like an outline or a ring) to preserve the interior space for your content. If you want the border drawn inward (standard CSS border-box behavior), you can override the custom CSS variable:
> `<div class="squircle-2xl border-4 border-red-500 [--tw-squircle-outset:0]">...</div>`

---

## 🛠 Advanced: Using with `tailwind-merge`

If you use `tailwind-merge` (standard in UI libraries like `shadcn/ui` for their `cn()` utility), you should configure it so that `squircle-*` classes properly override standard `rounded-*` classes when both are applied.

Extend your merge configuration to group `squircle` into the `rounded` class group:

```ts
import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [
        { squircle: [() => true] }, // Merges any squircle-* class into the rounded group
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
```

---

## 🧰 Utilities Included

- `initSquircle()`
  Registers the CSS Houdini Paint Worklet and sets up the custom CSS properties (`--tw-squircle-w` and `--tw-squircle-smooth`). It is safe to call multiple times and fails gracefully in environments where Houdini is not supported.

- `plugin(tailwindcss)`
  The default export is a Tailwind CSS plugin that provides the `squircle-*` utility classes. It automatically provides fallback `border-radius` styles for browsers that don't support the Paint API.

---

### Features

- 💃 **Native Tailwind Integration:** Use utility classes like `squircle-2xl` just like you would `rounded-2xl`. No framework-specific wrappers required and if the navigator don"'t support squricle the rounded value is applies.
- ⚡ **Zero-JS Layout Thrashing:** Driven by the native CSS Paint API (Houdini). No `ResizeObserver`, no DOM manipulation, no SVG paths. Repaints happen instantly on the compositor thread.
- 👌 **Framework Agnostic:** Works in React, Vue, Svelte, Solid, or plain HTML.

---

## 📦 Related Packages

| Package                                                        | Description                             |
| -------------------------------------------------------------- | --------------------------------------- |
| [`@usespaceui/avatars`](https://github.com/usespaceui/avatars) | Generative deterministic avatars        |
| [`@usespaceui/sounds`](https://github.com/usespaceui/sounds)   | UI sound effects and audio interactions |

---

## 🪪 License

MIT — Free for commercial and personal use.

---

## 📚 Resources

- 🔍 [Explore the squircles & Playground](https://squircle.spaceui.one)
- 🌍 [Space UI Official Site](https://www.spaceui.one)

---

## 🛠 Maintenance

If you find a bug or have a feature request, please open an [issue on GitHub](https://github.com/usespaceui/squircle/issues).
Engine internals are intentionally not part of the public API.

---

<p align="center">
  <a href="https://www.spaceui.one" target="_blank">
    <img src="https://www.spaceui.one/favicon.ico" width="60" style="border-radius: 50%" alt="Space UI Logo" />
  </a>
  <br />
  <b>Maintained by the Space UI Team</b>
</p>
