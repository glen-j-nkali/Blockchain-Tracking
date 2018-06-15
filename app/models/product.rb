class Product < ActiveRecord::Base
    include ShopifyApp::SessionStorage
  end
  