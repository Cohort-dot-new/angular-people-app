/* global angular */

(function() {
  angular.module("app").controller("peopleCtrl", function($scope, $http) {
    $scope.setup = function() {
      $http.get('/api/v1/people').then(function(response) {
        $scope.people = response.data;
        $scope.orderAttribute = 'name';
        $scope.isOrderDescending = false;
      });
    };

    $scope.toggleBioVisible = function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    };

    $scope.addPerson = function(inputName, inputBio) {
      var params = {
        name: inputName,
        bio: inputBio
      };
      $http.post('/api/v1/people', params).then(function(response) {
        $scope.people.push(response.data);
      }, function(error) {
        $scope.errors = error.data.errors;
      });
    };

    $scope.deletePerson = function(inputPerson) {
      var index = $scope.people.indexOf(inputPerson);
      if (index !== -1) {
        $scope.people.splice(index, 1);
      }
    };

    $scope.changeOrderAttribute = function(inputAttribute) {
      if (inputAttribute === $scope.orderAttribute) {
        $scope.isOrderDescending = !$scope.isOrderDescending;
      } else {
        $scope.isOrderDescending = false;
      }
      $scope.orderAttribute = inputAttribute;
    };

    $scope.getSortIcon = function(inputAttribute) {
      if (inputAttribute === $scope.orderAttribute) {
        if ($scope.isOrderDescending) {
          return 'v';
        } else {
          return '^';
        }
      } else {
        return '';
      }
    };

    window.$scope = $scope;
  });
})();
