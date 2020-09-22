(function () {
'use strict';

angular.module('ShoppingListPromiseApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);



ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {

  var list = this;

  list.ItemName = "";
  list.ItemQuantity = "";

  list.addItem = function () {
    ShoppingListService.addItem(list.ItemName , list.ItemQuantity );
  };

  list.getItems = ShoppingListService.getItems();

  list.RemoveItem = function (indexItem) {
    ShoppingListService.RemoveItem(indexItem);
  };


};







ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
function ShoppingListService($q, WeightLossFilterService) {

  var service = this;

  var Items = [];

  //
  // service.addItem = function (itemName, itemQuantity) {
  //
  //   var promise = WeightLossFilterService.CheckName(itemName);
  //
  //   promise.then( function (response) {
  //
  //     var nextPromise = WeightLossFilterService.CheckQuantity(itemQuantity);
  //
  //     nextPromise.then( function (response) {
  //
  //       var item = {
  //         name: itemName,
  //         quantity: itemQuantity
  //       };
  //
  //       Items.push(item);
  //
  //     }, function (errorResponse) {
  //       console.log(errorResponse.message);
  //     })
  //
  //   }, function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  //
  //
  // };




  //
  // service.addItem = function (itemName, itemQuantity) {
  //
  //   var promise = WeightLossFilterService.CheckName(itemName);
  //
  //   promise.then( function (response) {
  //     return WeightLossFilterService.CheckQuantity(itemQuantity);
  //   })
  //   .then( function (response) {
  //
  //     var item = {
  //       name: itemName,
  //       quantity: itemQuantity
  //     };
  //
  //     Items.push(item);
  //
  //   })
  //   .catch(function (errorMessage) {
  //     console.log(errorMessage.message);
  //   });
  //
  //
  // }


  service.addItem = function (itemName, itemQuantity) {

    var Name_Promise = WeightLossFilterService.CheckName(itemName);
    var Quantity_Promise = WeightLossFilterService.CheckQuantity(itemQuantity);

    $q.all( [ Name_Promise, Quantity_Promise ] )
    .then( function (response) {

      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    })
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });


  };



  service.getItems = function () {
    return Items;
  };

  service.RemoveItem = function (indexItem) {
    Items.splice(indexItem , 1);
  };


};



WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {

  var service = this;

  service.CheckName = function (name) {

    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {

      if(name.toLowerCase().indexOf('cookies') === -1)
      {
        deferred.resolve(result);
      }
      else {
        result.message = "Stay away from cookies ";
        deferred.reject(result);
      }

    }, 3000);



    return deferred.promise;
  };



  service.CheckQuantity = function (quantity) {

    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {

      if(quantity < 6 )
      {
        deferred.resolve(result);
      }
      else {
        result.message = "Tat's too much";
        deferred.reject(result);
      }

    }, 1000);

    return deferred.promise;
  };

};


})();
