app.controller('MetadataCtrl', function ($scope, $timeout, MetadataService, HostService, $uibModal) {

    var selectedMachineName;

    HostService.retrieveHosts().success(function (data) {
        $scope.machineNames = data;
        selectedMachineName = data[0];

        retrieveMetadataMetrics();
    });

    $scope.editMachineTab = function (currentMachineName, index) {

        var modalInstance = $uibModal.open({
            controller: 'HostModalCtrl',
            templateUrl: './host/host-modal.html',
            resolve: {
                machineName: function () {
                    return currentMachineName;
                }
            }
        });

        modalInstance.result.then(function (newMachineName) {

            $scope.machineNames[index] = newMachineName;

            MetadataService.updateMachineAlias(currentMachineName, newMachineName).success(function (data) {
                // TODO What happens on network fail? Progress bar? Spinner?
            });

        });
    };

    $scope.activeHost = function (machineName) {
        selectedMachineName = machineName;
        retrieveMetadataMetrics();
    };

    var retrieveMetadataMetrics = function () {

        MetadataService.retrieveMetadataForHost(selectedMachineName).success(function (data) {
            $scope.hostname = data.hostname;
            $scope.macAddress = data.macAddress;
            $scope.operatingSystem = data.operatingSystem;
            $scope.originPublicIPAddress = data.originPublicIPAddress;
        });
    };

});



