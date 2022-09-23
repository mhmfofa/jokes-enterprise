// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    /* Insert Start */
    browsers: ['Chrome', 'ChromeHeadlessCustom'],
    customLaunchers: {
        ChromeHeadlessCustom: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox', '--disable-gpu']
        }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
  },
  coverageIstanbulReporter: {
    dir: require('path').join(__dirname, './coverage'),
    reports: ['html', 'lcovonly', 'text-summary'],
    fixWebpackSourcePaths: true
},
    /* Insert End */
});

};
