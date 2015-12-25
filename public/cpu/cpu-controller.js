app.controller('CpuCtrl', function ($scope, $timeout, CpuService, HostService) {

    var sampleHost = "UnknownHost";

    HostService.retrieveHosts().success(function (data) {
        $scope.hosts = data;
        sampleHost = data[0];

        createOverlayChart();
    });

    $scope.activeHost = function (tab) {
        sampleHost = tab;
        //refreshOverlayChart();
    };

    var cpuMetricPoller = function () {
        refreshOverlayChart();
        $timeout(cpuMetricPoller, 5000);
    };

    // This needs to be called on the promise for hosts
    var createOverlayChart = function () {

        CpuService.retrieveCpuMetrics(sampleHost).success(function (data) {
            $scope.labels = CpuService.populateLabels(data);
            $scope.series = CpuService.populateSeries(data.length);
            $scope.cpuDataSeries = data;

            cpuMetricPoller();
        });
    };

    var refreshOverlayChart = function () {

        CpuService.retrieveCpuMetrics(sampleHost).success(function (data) {
            $scope.cpuDataSeries = data;
        });
    };

});