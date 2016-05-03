var gulp       = require('gulp'),
	del        = require('del'),
	plugins    = require('gulp-load-plugins')(),
	paths      = {
		bootstrap: {
			scripts: './node_modules/bootstrap/dist/js/bootstrap.js',
			styles: './node_modules/bootstrap/'
		},
		icons: {
			styles: './node_modules/material-icons/css/material-icons.min.css'
		},
		scripts: './src/js/**/*.js',
		styles: './src/scss/style.scss'
	};

function getTask(task) {
	return require('./tasks/' + task)(gulp, plugins, paths);
}

// Clean the dist directory
gulp.task('clean', function() {
	return del(['dist', 'screenshots', 'failures']);
});

gulp.task('clean:css', function() {
	return del(['dist/css']);
});

gulp.task('clean:js', function() {
	return del(['dist/js']);
});

// Compile all scripts together
gulp.task('scripts', ['clean:js'], getTask('scripts'));

// Compile all sass files together
gulp.task('styles', ['clean:css'], getTask('styles'));

gulp.task('test', function (){
	gulp.src('./testsuite.js')
	.pipe(phantomcss());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'scripts', 'styles']);
