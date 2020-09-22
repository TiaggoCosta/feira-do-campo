var mongoose = require("mongoose");
var Product = require("./models/product");

var data = [
    {
        title: "Cenoura", 
        price: "1.29"
    },
    {
        title: "Batata", 
        price: "2.49"
    },
    {
        title: "Tomate cereja", 
        price: "3.19"
    }
]

function seedDB(){
   //Remove all products
   Product.remove({}, (err) => {
        if(err){
            console.log(err);
        }
        console.log("removed products!");
         //add a few products
        data.forEach(function(seed){
            Product.create(seed, (err, product) => {
                if(err){
                    console.log(err)
                } else {
                    console.log("added a product");
                }
            });
        });
    }); 
}

module.exports = seedDB;
