$(".add-to-cart").click(function(eventObject) {
  eventObject.preventDefault();
  axios.post('cart/products/'+this.productId.value, {
    productId: this.productId.value
  })
  .then(function (response) {
    console.log(response);
  })
  .then(function (reject) {
    console.log(reject);
  })
  .catch(function (error) {
    console.log(error);
  });
  /* $.ajax({​​
    global: false,
    type: 'POST',
    url: '/products',
    dataType: 'html',
    data: {​​
      productId: productId
    }​​,
    success: function (result) {​​
        console.log(result);
    }​​,
    error: function (request, status, error) {​​
        serviceError();
    }​​
  }​​); */
})
/* function addToCart(eventObject) {
  Window.alert(this);
  eventObject.preventDefault();
  
} */
