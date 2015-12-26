app.config(function ($routeProvider, $locationProvider, ChartJsProvider) {

    $routeProvider
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: './home/home.html'
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