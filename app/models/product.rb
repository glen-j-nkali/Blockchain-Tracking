class Product < ActiveRecord::Base
    include ShopifyApp::SessionStorage
    belongs_to :shop
    validates :name, presence: true, on: [:create, :update, :options_only]
  end
  