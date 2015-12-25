app.controller('CpuCtrl', function ($scope, $timeout, CpuService, HostService) {

    var sampleHost = "UnknownHost";

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];

        initialiseCPUChartData();
    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
        refreshCPUChartData();
    };

    var initialiseCPUChartData = function () {

        CpuService.retrieveCpuMetrics(sampleHost).success(function (data) {
            $scope.labels = CpuService.populateLabels(data);
            $scope.series = CpuService.populateSeries(data.length);
            $scope.cpuDataSeries = data;
            $scope.cpuIsolationDataSeries = transformToCPUIsolationData(data);

            // Start the poller after cpu data is initialised
            cpuMetricPoller();
        });
    };

    // TODO Have a stop / pause / restart function for this.
    var cpuMetricPoller = function () {
        refreshCPUChartData();
        $timeout(cpuMetricPoller, 5000);
    };

    var refreshCPUChartData = function () {

        CpuService.retrieveCpuMetrics(sampleHost).success(function (data) {
            $scope.cpuDataSeries = data;
            $scope.cpuIsolationDataSeries = transformToCPUIsolationData(data);
        });
    };

    var transformToCPUIsolationData = function (data) {

        var isolationSeries = [];
        for (var i = 0; i < data.length; i++) {
            var seriesArr = [data[i]];
            isolationSeries.push(seriesArr)
        }

        return isolationSeries;
    };

});