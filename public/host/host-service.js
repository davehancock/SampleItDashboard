app.service('HostService', function ($http, hostname, port) {

    this.retrieveHosts = function () {
        return $http.get(hostname + ':' + port + '/hosts');
    }

});