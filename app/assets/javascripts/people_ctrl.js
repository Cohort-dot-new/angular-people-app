/* global angular */

(function() {
  angular.module("app").controller("peopleCtrl", function($scope, $http) {
    $scope.setup = function() {
      $http.get('/api/v1/people').then(function(response) {
        $scope.people = response.data;
      });
    };

    $scope.toggleBioVisible = function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    };

    $scope.addPerson = function(inputName, inputBio) {
      var newPerson = {
        name: inputName,
        bio: inputBio,
        bioVisible: false
      };
      $scope.people.push(newPerson);
    };

    $scope.deletePerson = function(inputPerson) {
      var index = $scope.people.indexOf(inputPerson);
      if (index !== -1) {
        $scope.people.splice(index, 1);
      }
    };

    window.$scope = $scope;
  });
})();
