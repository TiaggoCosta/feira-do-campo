$(".add-to-cart").click(function(eventObject) {

  var btnId = eventObject.target.id;
  var productId = btnId.replace('btn-','')

  eventObject.preventDefault();
  axios.post('cart/products/'+productId, {
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
