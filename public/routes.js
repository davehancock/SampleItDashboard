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
        });

    $locationProvider.html5Mode(true);

    // Configure all charts
    ChartJsProvider.setOptions({
        colours: ['#FF5252', '#FF8A80'],
        responsive: false
    });

    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
        datasetFill: false
    });

});