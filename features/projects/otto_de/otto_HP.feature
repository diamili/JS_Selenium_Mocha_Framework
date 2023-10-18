@otto
Feature: User can see HomePage and interact with all elements on it
  
  Scenario: User can see product-carousel on home page
    Given user is on the home page
    Then user can see "product-carousel"

  @otto-run-this
  Scenario: User can see product-carousel on home page
    Given user is on the home page
    When user clicks on "top-product-carousel-right-arrow-btn"
    Then user can see new items