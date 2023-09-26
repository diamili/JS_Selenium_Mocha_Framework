Feature: Add Todo Functionality

  Scenario: User adds a todo
    Given user is on the main page
    When user adds a todo with text "Learn JS Selenium"
    Then user should see last todo with text "Learn JS Selenium"