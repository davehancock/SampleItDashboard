app.controller('MetadataCtrl', function ($scope, $timeout, MetadataService, HostService) {

    var sampleHost;

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];
        retrieveMetadataMetrics();

    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
        retrieveMetadataMetrics();
    };

    var retrieveMetadataMetrics = function () {

        MetadataService.retrieveMetadataForHost(sampleHost).success(function (data) {
            $scope.hostname = data.hostname;
            $scope.macAddress = data.macAddress;
            $scope.operatingSystem = data.operatingSystem;
            $scope.originPublicIPAddress = data.originPublicIPAddress;
        });
    };

});



