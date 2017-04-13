var app = angular.module("adApp", []); 

app.controller("quoteCtrl", function($scope) {
    $scope.adTypes = ["Classic", "Standout", "Premium"];
});

app.controller("productCtrl", function($scope, $http) {
    $scope.addProduct = addProduct ;

    function addProduct(){
        var product = {} ;
        product.id = $scope.id ;
        product.name = $scope.name;
        product.price = $scope.price;

        $http.post('/product/add', product).
        success(function(data) {
            console.log("product added successfully");
        }).error(function(data) {
            console.error("error in adding product");
        })
    }
});