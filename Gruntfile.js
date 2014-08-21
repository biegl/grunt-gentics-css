/*
 * GenticsAssetUploader
 *
 *
 * Copyright (c) 2014 Markus Bürgler
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function (grunt) {
	// load all npm grunt tasks
	require("load-grunt-tasks")(grunt);

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				"Gruntfile.js",
				"tasks/*.js",
				"<%= nodeunit.tests %>"
			],
			options: {
				jshintrc: ".jshintrc",
				reporter: require("jshint-stylish")
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ["tmp"]
		},

		// Configuration to be run (and then tested).
		genticsCSS: {
			options: {
				css: [
					"./test/styles/test.css",
					"./test/styles/ie.css"
				],
				project: "emc"
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ["test/*_test.js"]
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks("tasks");

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask("test", ["clean", "genticsCSS", "nodeunit"]);

	grunt.registerTask("css", ["genticsCSS"]);

	// By default, lint and run all tests.
	grunt.registerTask("default", ["jshint", "test"]);

	grunt.registerTask("up", ["node-inspector"]);

};