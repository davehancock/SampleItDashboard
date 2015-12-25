app.service('CpuService', function ($http, hostname, port) {

    this.retrieveCpuMetrics = function (sampleHost) {
        return $http.get(hostname + ':' + port + '/cpu/samples/' + sampleHost + '/');
    };

    this.populateLabels = function (data) {

        var numberOfItems = 0;

        if (data.length > 0) {
            numberOfItems = data[0].length;
        }

        var labelArr = [];

        for (var i = 0; i < numberOfItems; i++) {
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