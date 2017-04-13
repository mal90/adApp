var app = angular.module("adApp", []); 
app.controller("quoteCtrl", function($scope) {
    $scope.adTypes = ["Classic", "Standout", "Premium"];
});