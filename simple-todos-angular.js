Drivers = new Mongo.Collection('drivers');

if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
// This code only runs on the client
angular.module('simple-todos',['angular-meteor', 'accounts.ui']);
  //angular.module('simple-todos',['angular-meteor']);
 
  angular.module('simple-todos').controller('TodosListCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {
       $scope.drivers = $meteor.collection(function() {
       return Drivers.find($scope.getReactively('query'), {sort: {createdAt: -1}})

      });
	  
	    $scope.addDriver = function (newDriver) {
        $meteor.call('addDriver', newDriver);
      };
 
        $scope.deleteDriver = function (driver) {
        $meteor.call('deleteDriver', driver._id);
      };
 
        $scope.setChecked = function (driver) {
        $meteor.call('setChecked', driver._id, !driver.checked);
      };
	  
	    $scope.addDriver = function (newDriver) {
        $scope.drivers.push( {
            text: newDriver,
            createdAt: new Date(),             // current time
            owner: Meteor.userId(),            // _id of logged in user
            username: Meteor.user().username }  // username of logged in user
        );
      };
	        $scope.$watch('filterDrivers', function() {
        if ($scope.filterDrivers)
          $scope.query = {checked: {$ne: true}};
        else
          $scope.query = {};
      });
	        $scope.incompleteCount = function () {
            return Drivers.find({ checked: {$ne: true} }).count();
      };
 
    }]);
 

}

Meteor.methods({
  addDriver: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Drivers.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteDriver: function (driverId) {
    Drivers.remove(driverId);
  },
  setChecked: function (driverId, setChecked) {
    Drivers.update(driverId, { $set: { checked: setChecked} });
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
