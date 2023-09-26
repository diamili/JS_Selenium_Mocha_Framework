module.exports = {
    default: `--format-options '{"snippetInterface": "synchronous"}'`,
        // Путь к вашим feature-файлам
        require: [
        'D:/Testing/Js_Selenium_Mocha_Framework/features/step_definitions/*.js',
        'D:/Testing/Js_Selenium_Mocha_Framework/features/*.feature',
        'D:/Testing/Js_Selenium_Mocha_Framework/features/step_definitions/beforeHooks.js'
    ],
        // Другие конфигурационные параметры
        timeout: 15 * 1000 
  }
