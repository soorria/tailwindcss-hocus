const plugin = require('tailwindcss/plugin')

/**
 * @param {string} modifier
 * @param {string} prefix
 * @returns {string}
 */
const addModifierIfNeeded = (modifier, prefix) => {
  return modifier ? `${prefix}\\/${modifier}` : prefix
}

const hocusPlugin = plugin(({ addVariant, matchVariant }) => {
  addVariant('hocus', ['&:hover', '&:focus'])
  addVariant('hocus-within', ['&:hover', '&:focus-within'])
  addVariant('hocus-visible', ['&:hover', '&:focus-visible'])

  if (matchVariant) {
    const variantValues = {
      hocus: 'focus',
      'hocus-within': 'focus-within',
      'hocus-visible': 'focus-visible',
    }

    const variants = [
      ['group', ' &'],
      ['peer', ' ~ &'],
    ]

    for (const [name, selectorEnd] of variants) {
      matchVariant(
        name,
        (value, { modifier }) => [
          `:merge(.${addModifierIfNeeded(modifier, name)}):hover${selectorEnd}`,
          `:merge(.${addModifierIfNeeded(modifier, name)}):${value}${selectorEnd}`,
        ],
        { values: variantValues }
      )
    }

    return
  }

  addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus &'])
  addVariant('group-hocus-within', [':merge(.group):hover &', ':merge(.group):focus-within &'])
  addVariant('group-hocus-visible', [':merge(.group):hover &', ':merge(.group):focus-visible &'])
  addVariant('peer-hocus', [':merge(.peer):hover ~ &', ':merge(.peer):focus ~ &'])
  addVariant('peer-hocus-within', [':merge(.peer):hover ~ &', ':merge(.peer):focus-within ~ &'])
  addVariant('peer-hocus-visible', [':merge(.peer):hover ~ &', ':merge(.peer):focus-visible ~ &'])
})

module.exports = hocusPlugin
