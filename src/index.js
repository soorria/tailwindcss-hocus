const plugin = require('tailwindcss/plugin')

const hocusPlugin = plugin(({ addVariant }) => {
  addVariant('hocus', ['&:hover', '&:focus'])
  addVariant('hocus-within', ['&:hover', '&:focus-within'])
  addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus &'])
  addVariant('group-hocus-within', [':merge(.group):hover &', ':merge(.group):focus-within &'])
  addVariant('peer-hocus', [':merge(.peer):hover &', ':merge(.peer):focus &'])
  addVariant('peer-hocus-within', [':merge(.peer):hover &', ':merge(.peer):focus-within &'])
})

module.exports = hocusPlugin
