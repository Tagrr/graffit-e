require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get wall" do
    get :wall
    assert_response :success
  end

  test "should get createwall" do
    get :createwall
    assert_response :success
  end

  test "should get history" do
    get :history
    assert_response :success
  end

end
