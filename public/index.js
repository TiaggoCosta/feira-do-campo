$(".add-to-cart").click(function(eventObject) {
  eventObject.preventDefault();
  axios.post('cart/products/'+this.productId, {
    productId: this.productId
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
});

$(function () {
  $('[data-toggle="popover"]').popover()
})
