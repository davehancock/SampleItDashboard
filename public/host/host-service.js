app.service('HostService', function ($http) {

    this.retrieveHosts = function(){
        return $http.get('http://localhost:3333/hosts');
    }

});