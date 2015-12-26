app.controller('CpuCtrl', function ($scope, $timeout, CpuService, HostService) {

    var sampleHost;

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];
        initialiseCPUChartData();

        // Start the poller after cpu data is initialised
        cpuMetricPoller();
    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
        initialiseCPUChartData();
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

    $scope.numberOfPointsSlider = {
        value: 20,
        options: {
            floor: 10,
            ceil: 100,
            step: 10,
            showSelectionBar: false,
            hideLimitLabels: true,
            disabled: false,
            showTicks: true
        }
    };

    var initialiseCPUChartData = function () {

        CpuService.retrieveCpuMetrics(sampleHost, $scope.numberOfPointsSlider.value).success(function (data) {
            $scope.series = CpuService.populateSeries(data.length);
            exposeChartValues(data);
        });
    };

    var refreshCPUChartData = function () {

        CpuService.retrieveCpuMetrics(sampleHost, $scope.numberOfPointsSlider.value).success(function (data) {
            exposeChartValues(data);
        });
    };

    var exposeChartValues = function (data) {
        $scope.labels = CpuService.populateLabels(data);
        $scope.cpuDataSeries = data;
        $scope.cpuIsolationDataSeries = transformToCPUIsolationData(data);
    };

    var transformToCPUIsolationData = function (data) {

        var isolationSeries = [];
        for (var i = 0; i < data.length; i++) {
            var seriesArr = [data[i]];
            isolationSeries.push(seriesArr)
        }

        return isolationSeries;
    };

    // TODO Have a stop / pause / restart function for this.
    var cpuMetricPoller = function () {
        refreshCPUChartData();
        $timeout(cpuMetricPoller, ($scope.timeoutSlider.value * 1000));
    };

});