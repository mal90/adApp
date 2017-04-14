var app = angular.module("adApp", []);

app.controller("dashboardCtrl", function ($scope) {
    $scope.goToAdProduct = goToAdProduct;
    $scope.goToAdCheckout = goToAdCheckout;

    function goToAdProduct() {
        window.location = '../products.html';
    }

    function goToAdCheckout() {
        window.location = '../checkout.html';
    }
});

app.controller("checkoutCtrl", function ($scope, $http) {
    $scope.customers = ['Default', 'UNILEVER', 'APPLE', 'NIKE', 'FORD'];
    $scope.adTypes = [];
    $scope.addItem = addItem;
    $scope.changeCustomer = changeCustomer;
    $scope.totalAddedItems = [];
    var customerSelected;
    getAllProducts();
    $scope.totalCheckoutValue = 0;

    function getAllProducts() {
        $http.get('/products').
            success(function (data) {
                $scope.products = data;
                getAllAdTypes(data);
            }).error(function (data) {
                console.error("error pccured");
            })
    }

    function getAllAdTypes(products) {
        products.forEach(function (product) {
            $scope.adTypes.push(product.name);
        });
    }

    function changeCustomer() {
        if (customerSelected != undefined && customerSelected != $scope.customerName) {
            var confirmChange = confirm("You will lose your current customer info ! Click OK to proceed");
            if (confirmChange) {
                $scope.totalAddedItems = [];
            } else {
                $scope.customerName = customerSelected;
            }
        }
    }

    function addItem() {
        var overwritten;

        if (isNaN($scope.numberOfItems)) {
            alert("Count should be a valid number");
            return false;
        }

        overwritten = false;
        $scope.totalAddedItems.forEach(function (addedItem, index) {
            if ($scope.selectedProduct != undefined && $scope.selectedProduct != null &&
                addedItem.name === $scope.selectedProduct.name) {
                var confirmOverWright = confirm("Do you want to overwright the current entry under the same Ad type ? Click OK to proceed");
                if (confirmOverWright) {
                    $scope.totalAddedItems.splice(index, 1);
                }
            }
        });

        addToCheckoutList();
    }

    function addToCheckoutList() {
        var addedItem = {};
        customerSelected = $scope.customerName;
        addedItem.name = $scope.selectedProduct.name;
        addedItem.id = $scope.selectedProduct.id;
        addedItem.price = $scope.selectedProduct.price;
        addedItem.numberOfItems = $scope.numberOfItems;
        addedItem.discountApplied = false;
        addedItem.totalPrice = discountLogic(addedItem);
        $scope.totalAddedItems.push(addedItem);
        calculateTotalCheckoutValue();
    }

    function calculateTotalCheckoutValue() {
        $scope.totalCheckoutValue = 0;
        $scope.totalAddedItems.forEach(function (addedItem, index) {
            $scope.totalCheckoutValue = $scope.totalCheckoutValue + addedItem.totalPrice;
        });
    }

    function discountLogic(addedItem) {
        var totalPrice = addedItem.totalPrice;
        if (!addedItem.discountApplied) {
            if ($scope.customerName === "UNILEVER") {
                if (addedItem.id === 'classic') {
                    if (addedItem.numberOfItems >= 2) {
                        addedItem.numberOfItems = parseFloat(addedItem.numberOfItems)+1;
                        totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                        addedItem.discountApplied = true;
                    }
                }
            }
            else if ($scope.customerName === 'APPLE') {
                if (addedItem.id === 'standout') {
                   addedItem.price = 299.99; 
                   totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price); 
                   addedItem.discountApplied = true;
                }
            }
            else if ($scope.customerName === 'NIKE') {
                if (addedItem.id === 'premium') {
                    if (addedItem.numberOfItems >= 4) {
                        addedItem.numberOfItems = parseFloat(addedItem.numberOfItems);
                        addedItem.price = 379.99; 
                        totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                        addedItem.discountApplied = true;
                    }
                }
            }
            else if ($scope.customerName === 'FORD') {
                if (addedItem.id === 'classic') {
                    if (addedItem.numberOfItems >= 4) {
                        addedItem.numberOfItems = parseFloat(addedItem.numberOfItems)+1;
                        totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                        addedItem.discountApplied = true;
                    }
                }
                if (addedItem.id === 'standout') {
                    addedItem.price = 309.99; 
                    totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price); 
                    addedItem.discountApplied = true;
                }
                if (addedItem.id === 'premium') {
                    if (addedItem.numberOfItems >= 3) {
                        addedItem.numberOfItems = parseFloat(addedItem.numberOfItems);
                        addedItem.price = 389.99; 
                        totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                        addedItem.discountApplied = true;
                    }
                }
            }
            
            totalPrice = totalPrice === addedItem.totalPrice ? parseFloat($scope.numberOfItems) * parseFloat(addedItem.price) : totalPrice;
            return totalPrice;
        }
    }
});

app.controller("productCtrl", function ($scope, $http) {
    $scope.disableField = false;
    $scope.clearFields = clearFields;
    $scope.addProduct = addProduct;
    $scope.editProduct = editProduct;
    $scope.getAllProducts = getAllProducts;

    getAllProducts();

    function getAllProducts() {
        $http.get('/products').
            success(function (data) {
                $scope.products = data
            }).error(function (data) {
                console.error("error pccured");
            })
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

        $http.post('/product/add', product).
            success(function (data) {
                console.log("product added successfully");
                getAllProducts();
            }).error(function (data) {
                alert("Product id is mandatory!");
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

});