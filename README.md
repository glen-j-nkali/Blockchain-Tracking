Blockchain Tracking project

Introducing the project
This week you will build a wish list app for Shopify stores.

Wish lists are an invaluable organizational tool for visitors to an online business. It gives buyer the opportunity to make note of products that appeal to them and create a reminder. It gives merchants a way to track what buyers wants and follow up with personalize marketing messages based on a buyer's interests.

The wish list app should:

Allow buyers to add products to a wish list from a Shopify store
Merchants to view products buyers have wish listed from the Shopify admin
What you need to get started
Clone this repo and create a working branch for your team
Partners account Note: You are acting like a Shopify partner this week, so, you will need a non-Shopify email
A Shopify store. The test shop you created during onboarding is fine.
Suggested path
Create an app
If you are reading this README.md, the good news is you already found the app repo. This is a Shopify Embedded App boilerplate to get up and running quickly.

Installation
dev clone blockchaintracking
dev up
What is dev? Learn more here

Configuring
Create a public app

Your app URL is

https://blockchaintracking.myshopify.io/
The redirect URLs are:

https://blockchaintracking.myshopify.io/
https://blockchaintracking.myshopify.io/auth/shopify/callback
Learn more about these URLs here 👉 https://help.shopify.com/api/getting-started/authentication/oauth#step-2-ask-for-permission

Generate credentials](https://help.shopify.com/api/getting-started/authentication/oauth#step-1-get-the-clients-credentials).

Add your app's API key and secret to config/initializers/shopify_app.rb

Running
Start a local server dev server
Visit your app at blockchaintracking.myshopify.io
Install your app
Visit blockchaintracking.myshopify.io and enter your Shopify store's domain.
Click the Install button
Add a wish list button to your shop's storefront
You need a way to load an element (perhaps, a wish list button) to a shop's storefront. This can be done using Javascript and the Shopify's ScriptTag resource.

This app's boilerplate already creates a ScriptTag for you on install. See Shopify::AfterAuthenticateJob. If you uninstalled and re-install the app, this job will run again and therefore recreate the ScriptTag.

The ScriptTag included in this project will insert a <script> tag linking to the public/buyer.js file, included in this repo. Any javascript you write in this file will be executed on each page of your online store.

💡HINT Use jQuery here to insert a link that will add product to your wish list.

Connecting the wish list
Your wish list button needs to call your app. You'll need to build some routes and controllers that let buyers register interested products.

The scrappy approach

Create a link that will take the buyer directly to your app e.g. https://blockchaintracking.myshopify.io/wanted_products/create?product_id=3

A better approach

Use an ajax request to call a blockchaintracking url in your app - it can be the same url as above, but, without redirecting buyer.

Saving the wish list
Time to write some ruby code 😃

First step, we need a resource. Some command line tips

Now, when you hit the url above you can create or delete a wish list element for that buyer.

🏃🏃‍🏃 Stretch Goal: In the app's simplest form, it will support 1 buyer's wish list. What would your store and app need to support multiple buyers? 💡HINT Check out the checkout 😉 settings in your store's admin.

Viewing the wish list
Create a new page in your app for the buyer to view their wish list e.g. https://blockchaintracking.myshopify.io/wanted_products

🏃🏃‍🏃 Stretch Goal: Buyer's can manually go to this link, however, it would be lovely if there was a link on every page directing them to their most wanted products.

Surfacing wish list products to the merchant
Awesome, your buyers have created a bunch of wish list items. Now, how do you show those interested products to the merchant?

This Shopify app template provides a merchant view already. You can add to this view in these files

app/controllers/home_controller.rb
app/views/home/index.html.erb
🏃🏃‍🏃 Stretch Goals Instead of using html and ruby in index.html.erb, try using Shopify's fancy new React framework, Polaris. Polaris has been included for you and you can your React code to app/javascript/packs/hello_react.jsx.

(If your team has time) A wish list for the wish list:
Allow buyers to send their wish lists to friends and family for an upcoming birthday or celebration
Allow merchants to send personal marketing emails based on a items in a buyer's wish list
See the most wished for items
Good luck and happy coding 💻!
Troubleshooting
Q: It looks like public/buyer.js is firing more than once per page load on the storefront. Whats going on? A: This app is setup to create a new script tag when the app is installed. When you install the app, /app/jobs/shopify/after_authenticate_job.rb is run. This should only add one script tag, but if in the course of development something goes wrong (like you tried to install with cookies disabled or an aggressive ad-blocker, or your app threw an exception on install), you may end up firing the job more than once. Uninstalling the app from your store will remove all the script tags associated with the shop. You can see the currently installed script tags by visiting https://shopify.com/admin/script_tags.json (this should ask you to log into your own test store)

Q: I don't understand how this app authenticates and does other 'magic' A: This app is a ruby on rails app that uses the shopify_app gem to do most of the heavy lifting. This gem works as a 'rails engine' or plugin and hides most of the behind the scenes code in the gem itself. To see how it works and what else you can do with the gem, checkout https://github.com/Shopify/shopify_app and the shopify_api gem used by the shopify_app gem to make REST calls to shopify https://github.com/Shopify/shopify_api