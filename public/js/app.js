var app = angular.module("adApp", []); 

app.controller("dashboardCtrl", function($scope) {
    $scope.gotToAddProduct = gotToAddProduct;

    function gotToAddProduct(){
        window.location = '../products.html';
    }
});

app.controller("quoteCtrl", function($scope) {

});

app.controller("productCtrl", function($scope, $http) {
    $scope.disableField = false;
    $scope.clearFields = clearFields;
    $scope.addProduct = addProduct ;
    $scope.editProduct = editProduct;
    $scope.getAllProducts = getAllProducts ;

    getAllProducts();

    function getAllProducts(){
        $http.get('/products').
        success(function(data) {
            $scope.products = data
        }).error(function(data) {
            console.error("error pccured");
        })
    }

    function addProduct(){
        var product = {} ;
        product.id = $scope.id ;
        product.name = $scope.name;
        product.price = $scope.price;

        if(product.id == undefined || product.id == ""){
            alert("Product id is mandatory!");
            return false;
        }

        $http.post('/product/add', product).
        success(function(data) {
            console.log("product added successfully");
            getAllProducts();
        }).error(function(data) {
            alert("Product id is mandatory!");
            console.error("error in adding product");
        })
    }

    function editProduct(product){
        $scope.id = product.id ;
        $scope.name = product.name;
        $scope.price = product.price;
        $scope.disableField = true;
    }

    function clearFields(){
        $scope.disableField = false;
        $scope.id = "" ;
        $scope.name = "";
        $scope.price = "";
    }

});