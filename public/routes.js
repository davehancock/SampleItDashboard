app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: './home/home.html'
        })
        .when('/lost', {
            templateUrl: './lost/lost.html'
        })
        .when('/metadata', {
            controller: 'MetadataCtrl',
            templateUrl: './metadata/metadata.html'
        })
        .when('/cpu', {
            controller: 'CpuCtrl',
            templateUrl: './cpu/cpu.html'
        })
        .when('/memory', {
            controller: 'MemoryCtrl',
            templateUrl: './memory/memory.html'
        })
        .when('/sample', {
            controller: 'SampleCtrl',
            templateUrl: './sample/sample.html'
        })
        .otherwise('/lost');

    $locationProvider.html5Mode(true);

});