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
      {expand: true, src: ['../images/**'], dest: '_dist/images'},
      {expand: true, src: ['js/no-concat/modernizr.js'], dest: '_dist/'},
    ]
  }
};
