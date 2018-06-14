ShopifyApp.configure do |config|
  config.application_name = "My Wishlist App"
  config.api_key = "put api_key here"
  config.secret = "put secret here"
  config.scope = ["read_orders", "read_products", "write_script_tags"].join(", ")
  config.embedded_app = true
  config.after_authenticate_job = false
  config.session_repository = Shop
  config.after_authenticate_job = { job: Shopify::AfterAuthenticateJob, inline: true }
end
