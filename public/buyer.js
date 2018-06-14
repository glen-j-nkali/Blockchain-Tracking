if(window.location.href.includes("/products/")) {
  alert("This is a product page!");
  var btn = document.createElement("BUTTON"); // Create a <button> element
  $(btn).attr("id","validateButton");
  $(btn).attr("type", "button");
  $(btn).attr("class", "btn product-form__cart-submit btn--secondary-accent");
  $(btn).on('click', function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://wishlist.myshopify.io/wish_lists", // change the url and the HTTP method to match our needs
        data: {
            id: meta.product.id, //$(this).val(), // < note use of 'this' here
            authenticity_token: $("meta[name='csrf-token']").attr("content")
        },
        success: function(result) {
            alert("item successfully validated");
            console.log('ok');
        },
        error: function(result) {
            alert("item could not be validated");
            console.log('error');
        }
    });
  });
  var t = document.createTextNode("VALIDATE"); // Create a text node
  btn.appendChild(t);                          // Append the text to <button>

  //Hacky way of creating margin between buttons but couldn't find the
  //correct css file to edit
  //TODO : to be moved to actual CSS
  var br = document.createElement("BR");
  $(".product-form__item--submit").append(br);
  //adding the  button below the checkout option
  $(".product-form__item--submit").append(btn);

  
} else {
  alert("This is not a product page :-)");
}
