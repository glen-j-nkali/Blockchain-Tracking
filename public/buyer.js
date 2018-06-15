if(window.location.href.includes("/products/")) {
  //alert("This is a product page!");
  var btn = document.createElement("BUTTON"); // Create a <button> element
  $(btn).attr("id","validateButton");
  $(btn).attr("type", "button");
  $(btn).attr("class", "btn product-form__cart-submit btn--secondary-accent");
  $(btn).on('click', function(e) {
      window.open("http://localhost:3000/");
    /*e.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://blockchaintracking.myshopify.io/product",
        headers: {
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers':'application/json',
        }, // change the url and the HTTP method to match our needs
        data: {
            id: meta.product.id, //$(this).val(), // < note use of 'this' here 
            shop_id: 1,
            name: "Product Name",
            metadata: "{}"
        },
        success: function(result) {
            console.log(meta);
            alert("item successfully validated");
            console.log('ok');
        },
        error: function(result) {
            console.log(meta);
            alert("item could not be validated");
            console.log('error');
        }
    });*/
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
  //alert("This is not a product page :-)");
}
