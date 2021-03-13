const nextPWA = require('next-pwa')

module.exports = nextPWA({
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public'
  }
})
