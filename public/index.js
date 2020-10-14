$(".add-to-cart").click(function(eventObject) {
  eventObject.preventDefault();
  console.log(this.productId.value)
  axios.post('/products', {
    productId: this.productId.value
  })
  .then(function (response) {
    console.log(response);
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
