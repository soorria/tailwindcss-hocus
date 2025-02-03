# tailwindcss-hocus

Adds `hocus:`, `hocus-within:`, `group-hocus:`, `group-hocus-within:`, `peer-hocus:`, `peer-hocus-within:` for
lazy people like me who use similar styles for `:hover` and `:focus` states.

Works with Tailwind v4!!

## Installation

> [!Note] If you're using Tailwind v3, you should install `tailwindcss-hocus@0.0.7`

```sh
npm i -D tailwindcss-hocus
```

```sh
yarn add -D tailwindcss-hocus
```

Add the plugin to your `tailwind.config.js`

```js
const hocusPlugin = require('tailwindcss-hocus')

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  // ...the rest of your config
  plugins: [hocusPlugin],
}
```

## Usage

You can use the variant added by this plugin just like you would `hover:` or `focus:`:

```html
<button className="hocus:text-red-700">Click Me!</button>
```

```css
.hocus\:text-red-700:hover,
.hocus\:text-red-700:focus {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity));
}
```
