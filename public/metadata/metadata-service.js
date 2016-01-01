app.service('MetadataService', function ($http, hostname, port) {

    this.retrieveMetadataForHost = function (sampleHost) {
        return $http.get(hostname + ':' + port + '/metadata/' + sampleHost + '/');
    };

});