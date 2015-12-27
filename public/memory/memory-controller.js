app.controller('MemoryCtrl', function ($scope, $timeout, MemoryService, HostService) {

    var sampleHost;

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];
        refreshCPUChartData();
    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
    };

    $scope.timeoutSlider = {
        value: 5,
        options: {
            floor: 1,
            ceil: 9,
            showSelectionBar: false,
            hideLimitLabels: true,
            disabled: false,
            showTicks: true
        }
    };

    var refreshCPUChartData = function () {

        MemoryService.retrieveCpuMetrics(sampleHost).success(function (data) {
            $scope.totalMemoryAvailable = data.totalMemory;
            $scope.labels = MemoryService.populateLabels();
            $scope.memoryDataSeries = [(data.totalMemory - data.availableMemory), data.availableMemory];

            $timeout(refreshCPUChartData, ($scope.timeoutSlider.value * 1000));
        });
    };

});




