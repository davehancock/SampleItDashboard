var app = angular.module('sampleit', ['sampleit.config', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'rzModule', 'chart.js']);

app.config(function (ChartJsProvider) {

    ChartJsProvider.setOptions({
        colours: ['#97BBCD','#DCDCDC', '#949FB1', '#66cae1'],
        responsive: true,
        scaleOverride: true,
        scaleSteps: 10,
        scaleStepWidth: 10,
        scaleStartValue: 0,
        animationSteps: 15
    });

});