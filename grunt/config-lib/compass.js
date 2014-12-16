module.exports = {
  options: {
    sassDir: '<%= pkg.config.app %>/_scss',
    imagesDir: '<%= pkg.config.app %>/img',
    generatedImagesDir: '<%= pkg.config.app %>/img',
    javascriptsDir: '<%= pkg.config.app %>/js',
    assetCacheBuster: 'none',
    require: [
      'sass-globbing',
      // 'toolkit',
      // 'rgbapng'
    ]
  },
  server: {
    options: {
      cssDir: '<%= pkg.config.dev %>/css',
      environment: 'development',
      outputStyle: 'expanded',
      relativeAssets: true,
      raw: 'line_numbers = :true\n'
    }
  },
  dist: {
    options: {
      cssDir: '<%= pkg.config.dist %>/css',
      environment: 'production',
      outputStyle: 'compressed',
      force: true
    }
  }
};
