app.controller('CpuCtrl', function ($scope, $timeout, CpuService, HostService) {

    var sampleHost;

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];
        refreshCPUChartData();

        cpuMetricPoller();
    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
        refreshCPUChartData();
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

    var refreshCPUChartData = function () {

        CpuService.retrieveCpuMetrics(sampleHost, $scope.numberOfPointsSlider.value).success(function (data) {
            $scope.series = CpuService.populateSeries(data.length);
            $scope.labels = CpuService.populateLabels(data);
            $scope.cpuDataSeries = data;
            $scope.cpuIsolationDataSeries = transformToCPUIsolationData(data);
        });
    };

    var transformToCPUIsolationData = function (data) {

        var isolationSeries = [];
        for (var i = 0; i < data.length; i++) {
            isolationSeries.push([data[i]])
        }

        return isolationSeries;
    };

    var cpuMetricPoller = function () {
        refreshCPUChartData();
        $timeout(cpuMetricPoller, ($scope.timeoutSlider.value * 1000));
    };

    // TODO Bug on window resize while panel closed
    // use chart redraw(). on window resize event
    // Resizes & redraws to fill its container element
    //  myLineChart.resize();
    // => returns 'this' for chainability


});