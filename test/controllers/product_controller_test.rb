require 'test_helper'

class ProductControllerTest < ActionDispatch::IntegrationTest
  test "should get hello" do
    get product_hello_url
    assert_response :success
  end

end
