app.service('HostService', function ($http) {

    this.retrieveHosts = function(){
        return $http.get('http://djh.tech:3333/hosts');
    }

});