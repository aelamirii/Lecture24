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
    ShoppingListService.addItem(list.ItemName, list.ItemQuantity);
  };

  list.getItems = ShoppingListService.getItems();


};



ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
function ShoppingListService($q,WeightLossFilterService) {

  var service = this;

  var Items = [];

//
//   service.addItem = function (itemName, itemQuantity) {
//
//     var promise = WeightLossFilterService.CheckName(itemName);
//
//
//     promise.then(function (response) {
//
//       var nextPromise = WeightLossFilterService.CheckQuantity(itemQuantity);
//
//       nextPromise.then( function (response) {
//
//         var item = {
//           name: itemName,
//           quantity: itemQuantity
//         };
//         Items.push(item);
//       } , function (errorMessage) {
//         console.log(errorMessage.message);
//       }
//     );
//
//   }, function (errorMessage) {
//     console.log(errorMessage.message);
//   }
// );
//
// };


//
// service.addItem = function (itemName, itemQuantity) {
//
//   var promise = WeightLossFilterService.CheckName(itemName);
//
//   promise.then( function (response) {
//     return WeightLossFilterService.CheckQuantity(itemQuantity);
//   }
//   )
//   .then( function (response) {
//     var item = {
//       name: itemName,
//       quantity: itemQuantity
//     };
//     Items.push(item);
//   })
//   .catch( function (errorResponse) {
//     console.log(errorResponse.message);
//   });
//
// };



service.addItem = function (itemName, itemQuantity) {

  var namePromise = WeightLossFilterService.CheckName(itemName);
  var quantityPromise = WeightLossFilterService.CheckQuantity(itemQuantity);

  $q.all([ namePromise, quantityPromise ])
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



}





WeightLossFilterService.$inject = ['$q', '$timeout'];
function WeightLossFilterService($q, $timeout) {

  var service = this;

  service.CheckName = function (name) {

    var deferred = $q.defer();

    var result = {
      message: ""
    };

    $timeout(function () {

      if(name.toLowerCase().indexOf('cookies') === -1 )
      {
        deferred.resolve(result);
      }
      else {
        result.message = "Stay away from cookies";
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

      if(quantity < 6)
      {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much ";
        deferred.reject(result);
      }


    }, 1000);


    return deferred.promise;
  };

}



})();
