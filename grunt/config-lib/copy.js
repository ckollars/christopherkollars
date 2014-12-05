module.exports = {
  grunticon: {
    files: [
      {expand: true, flatten: true, src: ['svgs/images/**'], dest: '../images/', filter: 'isFile'},
      {expand: true, flatten: true, src: ['svgs/grunticon/*.scss'], dest: 'scss/partials/utility/'},
    ]
  },
  images: {
    files: [
      { expand: true, cwd: '<%= pkg.config.app %>/img', src: '**', dest: '<%= pkg.config.dev %>/img' }
    ]
  },
  dist: {
    files: [
      { expand: true, cwd: '<%= pkg.config.app %>/img', src: '**', dest: '<%= pkg.config.dist %>/img' }
    ]
  }
};
