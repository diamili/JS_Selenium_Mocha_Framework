module.exports = {
    default: `--format-options '{"snippetInterface": "synchronous"}'`,

        require: [
        'D:/Testing/Js_Selenium_Mocha_Framework/features/step_definitions/*.js',
        'D:/Testing/Js_Selenium_Mocha_Framework/features/*.feature',
        'D:/Testing/Js_Selenium_Mocha_Framework/features/beforeHooks.js',
        'D:/Testing/Js_Selenium_Mocha_Framework/features/afterHooks.js'
    ],

        timeout: 5 * 1000, 
  }

  