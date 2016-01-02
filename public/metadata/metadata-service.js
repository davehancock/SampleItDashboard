app.service('MetadataService', function ($http, hostname, port) {

    this.retrieveMetadataForHost = function (machineName) {
        return $http.get(hostname + ':' + port + '/metadata/' + machineName + '/');
    };

    this.updateMachineAlias = function (oldMachineName, newMachineName) {
        return $http.post(hostname + ':' + port + '/metadata/' + oldMachineName + '/' + newMachineName + '/');
    };

});