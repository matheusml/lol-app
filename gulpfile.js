var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('default', function() {
    return gulp.src(['public/javascripts/angularApp.js',
                     'public/javascripts/directives/**',
                     'public/javascripts/services/**'])
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
});
