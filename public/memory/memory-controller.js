app.controller('MemoryCtrl', function ($scope, $timeout, HostService) {

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
    });

});