app.service('CpuService', function ($http) {

    this.retrieveCpuMetrics = function () {
        return $http.get('http://djh.tech:3333/cpus');
    };

    this.retrieveOverlayCpuMetrics = function () {
        return $http.get('http://djh.tech:3333/cpu/overlay');
    };

    this.retrieveOverlayCpuMetrics = function () {
        return $http.get('http://djh.tech:3333/cpu/overlay/');
    };

    this.populateLabels = function () {

        var labelArr = [];

        for (i = 0; i < 30; i++) {
            labelArr.push(i + 1);
        }

        return labelArr;
    };

    this.populateSeries = function (numberOfCores) {

        var seriesArr = [];

        for (o = 0; i < numberOfCores; i++) {
            seriesArr.push("Core " + (i + 1))
        }

        return seriesArr;
    }

});