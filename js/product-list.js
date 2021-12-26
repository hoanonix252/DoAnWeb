let app1 = angular.module("ProductBSApp", []);
app1.controller("ProductBSController", ($scope, $http) => {
  $http({
    method: "GET",
    url: "../data/products.json",
  }).then(
    function success(response) {
      $scope.products = response.data;
      $scope.products = [];
      let search = "";
      if (localStorage.getItem("search")) {
        search = localStorage.getItem("search").trim().toLowerCase();
      }
      if (search != null || search != " ") {
        response.data.forEach((element) => {
          if (element.Ten.toLowerCase().includes(search)) {
            $scope.products.push(element);
          }
        });
      } else {
        $scope.products = response.data;
      }
      localStorage.removeItem("search");
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
    product.inCart = 1;

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
//----------------
let app2 = angular.module("angularApp", []);
app2.controller("ProductController", ($scope, $http) => {
  $http({
    method: "GET",
    url: "../data/products.json",
  }).then(
    function success(response) {
      $scope.products = [];
      let search = "";
      if (localStorage.getItem("search")) {
        search = localStorage.getItem("search").trim().toLowerCase();
      }
      if (search != null || search != " ") {
        response.data.forEach((element) => {
          if (element.Ten.toLowerCase().includes(search)) {
            $scope.products.push(element);
          }
        });
      } else {
        $scope.products = response.data;
      }
      localStorage.removeItem("search");
    },
    function error(response) {
      $scope.error = response.statusText;
    }
  );
});
