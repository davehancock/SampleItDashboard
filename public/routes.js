app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: './home/home.html'
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
        });

    $locationProvider.html5Mode(true);

});