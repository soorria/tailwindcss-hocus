const plugin = require('tailwindcss/plugin')

/**
 * Adapted from https://github.com/tailwindlabs/tailwindcss/blob/master/src/featureFlags.js
 *
 * @param {import('tailwindcss').Config} config
 * @param {string} flag
 * @returns {boolean}
 */
const futureFlagEnabled = (config, flag) => {
  return config.future === 'all' || (config?.future?.[flag] ?? false)
}

/**
 * @param {string} modifier
 * @param {string} prefix
 * @returns {string}
 */
const addModifierIfNeeded = (modifier, prefix) => {
  return modifier ? `${prefix}\\/${modifier}` : prefix
}

const hocusPlugin = plugin(({ addVariant, config }) => {
  const hoverOnlyWhenSupported = futureFlagEnabled(config(), 'hoverOnlyWhenSupported')
  const wrapSelectorForHoverIfNeeded = (/** @type {string} */ selector) =>
    hoverOnlyWhenSupported ? `@media (hover: hover) and (pointer: fine) { ${selector} }` : selector

  const hoverSelector = wrapSelectorForHoverIfNeeded('&:hover')

  addVariant('hocus', [hoverSelector, '&:focus'])
  addVariant('hocus-within', [hoverSelector, '&:focus-within'])
  addVariant('hocus-visible', [hoverSelector, '&:focus-visible'])
})

module.exports = hocusPlugin
