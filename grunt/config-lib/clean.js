module.exports = {
  grunticon: {
    src: ['<%= pkg.config.app %>/svgs/grunticon', '<% pkg.config.app %>/svgs/images']
  },
  server: [
    '_dev'
  ],
  dist: [
    '_dist'
  ]
};
