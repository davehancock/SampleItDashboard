app.controller('HostModalCtrl', function ($scope, $uibModalInstance, machineName) {

    $scope.currentTab = machineName;

    $scope.newTabName = "";

    $scope.ok = function () {
        $uibModalInstance.close($scope.newTabName);
    };

});