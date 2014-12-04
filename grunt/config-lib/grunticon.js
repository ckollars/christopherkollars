module.exports = {
  icons: {
    options: {
      src: '<%= pkg.config.app %>/svgs/',
      dest: '<%= pkg.config.app %>/svgs/grunticon',
      pngfolder: '<%= pkg.config.app %>/images/',
      datasvgcss: '_icons.data.svg.scss',
      datapngcss: '_icons.data.png.scss',
      urlpngcss: '_icons.fallback.scss'
    }
  }
};
