(function () {
    'use strict';

    angular.module('adApp').controller('productsCtrl', productsCtrl);

    productsCtrl.$inject = ['$scope','productsService'];

    function productsCtrl($scope,productsService) {
        $scope.disableField = false;
        $scope.clearFields = clearFields;
        $scope.addProduct = addProduct;
        $scope.editProduct = editProduct;
        $scope.getAllProducts = getAllProducts;

        getAllProducts();

        function getAllProducts() {
            productsService.getAllProducts()
                .success(function (data) {
                    $scope.products = data;
                }).error(function (data) {
                    console.error("error pccured");
                });
        }

        function addProduct() {
            var product = {};
            product.id = $scope.id;
            product.name = $scope.name;
            product.price = $scope.price;

            if (product.id == undefined || product.id == "") {
                alert("Product id is mandatory!");
                return false;
            }

            productsService.addProduct(product)
                .success(function (data) {
                    console.log("product added successfully");
                    getAllProducts();
                    alert("Product added successfully");
                }).error(function (data) {
                    alert("Something went wrong while adding the product");
                    console.error("error in adding product");
                })

        }

        function editProduct(product) {
            $scope.id = product.id;
            $scope.name = product.name;
            $scope.price = product.price;
            $scope.disableField = true;
        }

        function clearFields() {
            $scope.disableField = false;
            $scope.id = "";
            $scope.name = "";
            $scope.price = "";
        }
    }
})();
