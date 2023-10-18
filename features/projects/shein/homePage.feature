Feature: User can see HomePage and interact with all elements on it
  
  
  Scenario: User should see carousel-image
    Given user is on the home page
    Then user can see "carousel-image"

  Scenario: User should see different images in carousel-image when it swipes automatically
  This scenario doesn't work properly
    Given user is on the home page
    Then user can see different images in "carousel-image"

  @run-this
  Scenario: User can switch the carousel images by clicking arrow btns
  Arrow btns do not appear under tests
    Given user is on the home page
    When user clicks on "carousel-image-left-arrow-btn"
    Then user sees the image was changed