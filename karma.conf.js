module.exports = function(config){

    config.set({
        singleRun : true,
        basePath : './public/',

        reporters : ['dots', 'junit','coverage'],

        files : [
			'bower_components/angular/angular.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'javascripts/angularApp.js',
            'javascripts/**/*.js',
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter : {
            outputFile: '../test_out/unit.xml',
            suite: 'unit'
        },

        coverageReporter : {
            type : 'html',
            dir : '../coverage/'
        }
    });
};
