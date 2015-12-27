app.controller('MemoryCtrl', function ($scope, $timeout, MemoryService, HostService) {

    var sampleHost;

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];
        refreshMemoryChartData();

        memoryMetricPoller();
    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
        refreshMemoryChartData();
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

    var refreshMemoryChartData = function () {

        MemoryService.retrieveMemoryMetrics(sampleHost).success(function (data) {
            $scope.totalMemoryAvailable = data.totalMemory;
            $scope.labels = ['Allocated Memory (Bytes)', 'Available Memory (Bytes)'];
            $scope.memoryDataSeries = [(data.totalMemory - data.availableMemory), data.availableMemory];
        });
    };

    var memoryMetricPoller = function () {
        refreshMemoryChartData();
        $timeout(memoryMetricPoller, ($scope.timeoutSlider.value * 1000));
    };

});



