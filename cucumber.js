// const { setWorldConstructor } = require('./node_modules/cucumber');
// const { AllureReporter } = require('allure-js-commons');

// setWorldConstructor(function ({ attach }) {
//     const reporter = new AllureReporter({ targetDir: 'D:/Testing/JS_Selenium_Mocha_Framework/allure-results' });
//     reporter.writeEnvironmentInfo({});
//     this.attach = attach;
//   });

module.exports = {
    default: `--format-options '{"snippetInterface": "synchronous"}'`,
        // Путь к вашим feature-файлам
        require: [
        'D:/Testing/Js_Selenium_Mocha_Framework/features/step_definitions/*.js',
        'D:/Testing/Js_Selenium_Mocha_Framework/features/*.feature',
        'D:/Testing/Js_Selenium_Mocha_Framework/features/step_definitions/beforeHooks.js'
    ],
        // Другие конфигурационные параметры
        timeout: 50 * 1000, 
  }

  