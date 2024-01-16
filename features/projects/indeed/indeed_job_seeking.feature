@indeed
Feature: As a job-seeker, I can find all QA jobs which are not required fluent German
  
  @indeed-run-this
  Scenario: I can find a list of job-offers
    Given user is on the home page
    Then user searches 'QA'