module.exports = {
  server: [
    'compass:server',
    'jekyll:server'
  ],
  dist: [
    'compass:dist',
    'copy:dist'
  ]
};
