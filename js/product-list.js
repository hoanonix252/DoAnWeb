let app1 = angular.module("ProductBSApp", [])
app1.controller("ProductBSController", ($scope, $http) => {
    $http({
        method: "GET",
        url: "../data/bestseller.json",
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
        });
})
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