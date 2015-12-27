app.service('MemoryService', function ($http, hostname, port) {

    this.retrieveCpuMetrics = function (sampleHost) {
        return $http.get(hostname + ':' + port + '/memory/sample/' + sampleHost + '/');
    };

    this.populateLabels = function (data) {

        var labelArr = ['Allocated Memory (Bytes)', 'Available Memory (Bytes)'];
        return labelArr;
    };

});