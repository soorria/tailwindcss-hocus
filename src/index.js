const plugin = require('tailwindcss/plugin')

/**
 * Adapted from https://github.com/tailwindlabs/tailwindcss/blob/master/src/featureFlags.js
 *
 * @param {import('tailwindcss').Config} config
 * @param {string} flag
 * @returns {boolean}
 */
const futureFlagEnabled = (config, flag) => {
  return config.future === 'all' || (config?.future?.[flag] ?? defaults[flag] ?? false)
}

/**
 * @param {string} modifier
 * @param {string} prefix
 * @returns {string}
 */
const addModifierIfNeeded = (modifier, prefix) => {
  return modifier ? `${prefix}\\/${modifier}` : prefix
}

const hocusPlugin = plugin(({ addVariant, matchVariant, config }) => {
  const hoverOnlyWhenSupported = futureFlagEnabled(config(), 'hoverOnlyWhenSupported')
  const wrapSelectorForHoverIfNeeded = (/** @type {string} */ selector) =>
    hoverOnlyWhenSupported ? `@media (hover: hover) and (pointer: fine) { ${selector} }` : selector

  const hoverSelector = wrapSelectorForHoverIfNeeded('&:hover')

  addVariant('hocus', [hoverSelector, '&:focus'])
  addVariant('hocus-within', [hoverSelector, '&:focus-within'])
  addVariant('hocus-visible', [hoverSelector, '&:focus-visible'])

  if (matchVariant) {
    const variantFocusSelectors = {
      hocus: 'focus',
      'hocus-within': 'focus-within',
      'hocus-visible': 'focus-visible',
    }

    const variantsEndParts = {
      group: ' &',
      peer: ' ~ &',
    }

    for (const [name, selectorEnd] of Object.entries(variantsEndParts)) {
      matchVariant(
        name,
        (value, { modifier }) => {
          const hoverSelector = wrapSelectorForHoverIfNeeded(
            `:merge(.${addModifierIfNeeded(modifier, name)}):hover${selectorEnd}`
          )
          const focusSelector = `:merge(.${addModifierIfNeeded(
            modifier,
            name
          )}):${value}${selectorEnd}`

          return [hoverSelector, focusSelector]
        },
        { values: variantFocusSelectors }
      )
    }

    return
  }

  const groupHoverSelector = wrapSelectorForHoverIfNeeded(':merge(.group):hover &')
  const peerHoverSelector = wrapSelectorForHoverIfNeeded(':merge(.peer):hover ~ &')

  addVariant('group-hocus', [groupHoverSelector, ':merge(.group):focus &'])
  addVariant('group-hocus-within', [groupHoverSelector, ':merge(.group):focus-within &'])
  addVariant('group-hocus-visible', [groupHoverSelector, ':merge(.group):focus-visible &'])
  addVariant('peer-hocus', [peerHoverSelector, ':merge(.peer):focus ~ &'])
  addVariant('peer-hocus-within', [peerHoverSelector, ':merge(.peer):focus-within ~ &'])
  addVariant('peer-hocus-visible', [peerHoverSelector, ':merge(.peer):focus-visible ~ &'])
})

module.exports = hocusPlugin
