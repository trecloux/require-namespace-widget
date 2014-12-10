module.exports = function (grunt) {
// Load grunt tasks automatically
require('load-grunt-tasks')(grunt);

// Define the configuration for all the tasks
grunt.initConfig({
    // Project settings
    config: {
        // Configurable paths
        widget: 'widget',
		publisher : 'publisher/app'
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
        livereload: {
            options: {
                livereload: '<%= connect.publisher.options.livereload %>'
            },
            files: [
                '<%= config.widget %>{,*/}*.*',
                '! 	<%= config.widget %>/dist/*.*',			
                '<%= config.publisher %>/{,*/}*.*'
            ],
			tasks: ['build']
        }
    },
    // The actual grunt server settings
    connect: {
        options: {
            hostname: '0.0.0.0'
        },
        widget: {
            options: {
            	port: 9000,
                base: ['<%= config.widget %>'],
			    middleware: function (connect, options, middlewares) {
					middlewares.unshift(function (req, res, next) {
				        res.setHeader('Access-Control-Allow-Origin', '*');
				        res.setHeader('Access-Control-Allow-Methods', '*');
				        return next();
			        });
		           return middlewares;
	           }				
            }
        },
        publisher: {
            options: {
            	livereload: 35729,							
            	port: 9001,
                base: ['<%= config.publisher %>']				
            }
        }		
    },
	requirejs: {
		compile: {
			options: {
				mainConfigFile: '<%= config.widget %>/scripts/widget-main.js',
			    paths: {
			        requireLib: '../../bower_components/requirejs/require'
			    },				
				dir: '<%= config.widget %>/dist',
                optimize: "none",				
			    //Indicates the namespace to use for require/requirejs/define.
			    namespace: "WidgetNS",
			    modules: [
			        {
			            name: "widget",
			            include: ["requireLib", "widget-main"],
			            create: true
			        }
			    ]
			}
	  	}
	}	
});
grunt.registerTask('build', function (target) {
    grunt.task.run([
		'requirejs:compile'
	]);
});
grunt.registerTask('serve', function (target) {
    grunt.task.run([
		'build',
        'connect:widget',
        'connect:publisher',		
        'watch'
    ]);
});
}
