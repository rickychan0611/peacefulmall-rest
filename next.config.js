const nextTranslate = require('next-translate')

module.exports = nextTranslate()

// module.exports = {
//   ...nextTranslate(),
//   experimental: {
//     scrollRestoration: true
//   }
// }

module.exports = nextTranslate({
  experimental: {
    scrollRestoration: true
  },
  future: {
    webpack5: true,
  },
})

// module.exports = {
//   future: {
//     webpack5: false,
//   },
// }