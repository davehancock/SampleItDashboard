app.controller('CpuCtrl', function ($scope, $timeout, CpuService, HostService) {

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
    });

    var cpuMetricPoller = function () {
        refreshOverlayChart();
        $timeout(cpuMetricPoller, 5000);
    };

    var createOverlayChart = function () {

        CpuService.retrieveOverlayCpuMetrics().success(function (data) {
            $scope.labels = CpuService.populateLabels();
            $scope.series = CpuService.populateSeries(data.length);
            $scope.cpuDataSeries = data;
        });
    };

    var refreshOverlayChart = function () {

        CpuService.retrieveOverlayCpuMetrics().success(function (data) {
            $scope.cpuDataSeries = data;
        });

    };

    // Kick off the poller
    createOverlayChart();
    cpuMetricPoller();

});