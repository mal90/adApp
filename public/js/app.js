var app = angular.module("adApp", []); 

app.controller("dashboardCtrl", function($scope) {
    $scope.goToAdProduct = goToAdProduct;
    $scope.goToAdCheckout = goToAdCheckout;

    function goToAdProduct(){
        window.location = '../products.html';
    }

    function goToAdCheckout(){
        window.location = '../checkout.html';
    }
});

app.controller("checkoutCtrl", function($scope,$http) {
    $scope.customers = ['Default','UNILEVER','APPLE','NIKE','FORD'];
    $scope.adTypes = [];
    $scope.addItem = addItem;
    $scope.totalAddedItems = [];
    getAllProducts();

    function getAllProducts(){
        $http.get('/products').
        success(function(data) {
            $scope.products = data ;
            getAllAdTypes(data);
        }).error(function(data) {
            console.error("error pccured");
        })
    }

    function getAllAdTypes(products){
        products.forEach(function(product) {
            $scope.adTypes.push(product.name);
        });
    }

    function addItem(){
        calculateTotal();
    }
    
    function calculateTotal(){
        var addedItem = {};
        if(isNaN($scope.numberOfItems)){
            alert("Count should be a valid number");
            return false;
        }

        var itemExists = false ;
        $scope.totalAddedItems.forEach(function(addedItem) {
            if($scope.selectedProduct != undefined && $scope.selectedProduct!= null && 
                addedItem.name === $scope.selectedProduct.name){
                addedItem.numberOfItems =  parseInt(addedItem.numberOfItems) + parseInt($scope.numberOfItems) ;
                addItem.discountApplied = false ;
                addedItem.totalPrice = discountLogic(addedItem) ;   
                itemExists = true;
            }
        });

        if(!itemExists){
            addedItem.name = $scope.selectedProduct.name;
            addedItem.id = $scope.selectedProduct.id;
            addedItem.price = $scope.selectedProduct.price;
            addedItem.numberOfItems = $scope.numberOfItems;
            addItem.discountApplied = false ;
            addedItem.totalPrice = discountLogic(addedItem);
            $scope.totalAddedItems.push(addedItem);
        }

        function discountLogic(addedItem){
            var totalPrice = addedItem.totalPrice;
            if(!addedItem.discountApplied)
            {
                if($scope.customerName === "UNILEVER"){
                    if(addedItem.id === 'classic'){
                        if(addedItem.numberOfItems >= 2){
                            addedItem.numberOfItems = parseInt(addedItem.numberOfItems)+1;
                            totalPrice = parseInt(addedItem.numberOfItems) * parseInt(addedItem.price);
                            addedItem.discountApplied = true;
                        }
                    }
                }
                else if($scope.customerName === 'APPLE'){

                }
                else if($scope.customerName === 'NIKE'){

                }
                else if($scope.customerName === 'FORD'){

                }
                else{

                }

                totalPrice = totalPrice === addedItem.totalPrice ? parseInt(addedItem.numberOfItems) * parseInt(addedItem.price) : totalPrice ;
                return totalPrice ;
            }
            else{
                if($scope.customerName === "UNILEVER"){
                    if(addedItem.id === 'classic'){
                        totalPrice = parseInt(addedItem.numberOfItems) * parseInt(addedItem.price);
                        addedItem.discountApplied = true;
                    }
                }

                totalPrice = totalPrice === addedItem.totalPrice ? parseInt(addedItem.numberOfItems) * parseInt(addedItem.price) : totalPrice ;
                return totalPrice ;
            }
        }
    }
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