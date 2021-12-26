var urlparams = new URLSearchParams(location.search);
var HinhSP = urlparams.get("hinh");
// ------------------
let app = angular.module("angularApp", []);
app.controller("ProductController", ($scope, $http) => {
  $http({
    method: "GET",
    url: "../data/products.json",
  }).then(
    function success(response) {
      $scope.selectedProduct = response.data.find(
        (value) => value.Hinh == HinhSP
      );
    },
    function error(response) {
      $scope.error = response.statusText;
    }
  );
  $scope.addToCart = (product) => {
    let cartItems = [];
    try {
      cartItems = Object.values(
        JSON.parse(localStorage.getItem("productsInCart"))
      );
    } catch {
      cartItems = [];
    }
    product.inCart = parseInt(document.getElementById("quantity").innerHTML);

    let isDuplicated = false;
    cartItems.forEach((value, index) => {
      if (value.Hinh === product.Hinh) {
        isDuplicated = true;
        cartItems[index].inCart = parseInt(product.inCart) + parseInt(cartItems[index].inCart);
        return;        
      }
    });
    if (!isDuplicated) {
      cartItems.push(product);
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    let productNumbers = localStorage.getItem("cartNumbers") || 0;
    productNumbers = parseInt(productNumbers) + product.inCart;
    localStorage.setItem("cartNumbers", productNumbers);
    document.querySelector(".csw-btn-button span").textContent = productNumbers;
  };
});
// ------------------
const quantity = document.getElementById("quantity");

function updateItemQuantity(element, valueChange) {
  let currentValue = parseInt(element.innerHTML);
  currentValue += valueChange;

  if (currentValue > 0) {
    element.innerHTML = currentValue;

    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

    cartItems.forEach((item) => {
      if (item.Hinh === element.id) {
        item.inCart = currentValue;
      }
    });
    localStorage.setItem("productsInCart", JSON.stringify([...cartItems]));
  }
}
