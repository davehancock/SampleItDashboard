app.controller('MemoryCtrl', function ($scope, $timeout, MemoryService, HostService) {

    var sampleHost;

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];
        initialiseMemoryChartData();

        // Start the poller after cpu data is initialised
        memoryMetricPoller();
    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
        initialiseMemoryChartData();
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

    var initialiseMemoryChartData = function () {

        MemoryService.retrieveCpuMetrics(sampleHost).success(function (data) {
            $scope.totalMemoryAvailable = data.totalMemory;
            exposeChartValues(data);
        });
    };

    var refreshCPUChartData = function () {

        MemoryService.retrieveCpuMetrics(sampleHost).success(function (data) {
            exposeChartValues(data);
        });
    };

    var exposeChartValues = function (data) {
        $scope.labels = MemoryService.populateLabels();

        var dataArr = [(data.totalMemory - data.availableMemory), data.availableMemory];
        $scope.memoryDataSeries = dataArr;
    };

    // TODO Have a stop / pause / restart function for this.
    var memoryMetricPoller = function () {
        refreshCPUChartData();
        $timeout(memoryMetricPoller, ($scope.timeoutSlider.value * 1000));
    };

});




