app.service('MemoryService', function ($http, hostname, port) {

    this.retrieveMemoryMetrics = function (sampleHost) {
        return $http.get(hostname + ':' + port + '/memory/sample/' + sampleHost + '/');
    };

});