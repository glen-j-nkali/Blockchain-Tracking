module Shopify
  class AfterAuthenticateJob < ActiveJob::Base
    def perform(shop_domain:)
      shop = Shop.find_by(shopify_domain: shop_domain)

      shop.with_shopify_session do
        ShopifyAPI::ScriptTag.create(
          event: "onload",
          src: "https://wishlist.myshopify.io/buyer.js"
        )
      end
    end
  end
end
