app.service('CpuService', function ($http, hostname, port) {

    this.retrieveCpuMetrics = function () {
        return $http.get(hostname + ':' + port + '/cpus');
    };

    this.retrieveOverlayCpuMetrics = function () {
        return $http.get(hostname + ':' + port + '/cpu/overlay/');
    };

    this.populateLabels = function () {

        var labelArr = [];

        for (var i = 0; i < 30; i++) {
            labelArr.push(i + 1);
        }

        return labelArr;
    };

    this.populateSeries = function (numberOfCores) {

        var seriesArr = [];

        for (var i = 0; i < numberOfCores; i++) {
            seriesArr.push("Core " + (i + 1))
        }

        return seriesArr;
    }

});