ShopifyApp.configure do |config|
  config.application_name = "BlockchainTracking"
  config.api_key = "aefd20bb532a692e42d683cbb7d859d5"
  config.secret = "d74fd28dabf6fff2c25825831bb8474b"
  config.scope = ["read_orders", "read_products", "write_script_tags"].join(", ")
  config.embedded_app = true
  config.after_authenticate_job = false
  config.session_repository = Shop
  config.after_authenticate_job = { job: Shopify::AfterAuthenticateJob, inline: true }
end
