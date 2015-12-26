var app = angular.module('sampleit', ['sampleit.config', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'chart.js']);

app.config(function (ChartJsProvider) {

    ChartJsProvider.setOptions({
        colours: ['#97BBCD','#DCDCDC', '#949FB1', '#66cae1'],
        responsive: true
    });

});