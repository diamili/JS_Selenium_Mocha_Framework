@otto
Feature: As a client, I can see HomePage and interact with all elements on it
  
  Scenario: User can see product-carousel on home page
    Given user is on the home page
    Then user can see "top-product-carousel"

  Scenario: User can see product-carousel on home page
    Given user is on the home page
    When user clicks on "top-product-carousel-right-arrow-btn"
    Then user can see new items

  @otto-run-this
  Scenario: User can click on any product in product-carousel and being navigated to the Product details page
    Given user is on the home page
    When user clicks random element