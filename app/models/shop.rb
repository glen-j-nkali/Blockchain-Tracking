class Shop < ActiveRecord::Base
  include ShopifyApp::SessionStorage
  has_many :products, dependent: :destroy
end
