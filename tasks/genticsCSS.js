/*
 * genticsCSS
 *
 *
 * Copyright (c) 2014 Markus Bürgler
 * Licensed under the MIT license.
 */

"use strict";

var fs = require("fs");

module.exports = function (grunt) {
	grunt.registerTask("genticsCSS", function () {
		var done = this.async();

		var options = this.options({
			css: [],
			baseFolder: "./test/gentics_css",
			fontsFolder: "fonts",
			imagesFolder: "images",
			stylesFolder: "styles",
			project: "csi"
		});

		// Quit if no stylesheets are provided.
		if (options.css.length === 0) {
			grunt.warn("No stylesheets to optimize!");
			done(false);
			return;
		}

		var deleteFolderRecursive = function (path) {
			if (fs.existsSync(path)) {
				fs.readdirSync(path).forEach(function (file, index) {
					var curPath = path + "/" + file;
					if (fs.lstatSync(curPath).isDirectory()) { // recurse
						deleteFolderRecursive(curPath);
					} else { // delete file
						fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(path);
			}
		};

		// Delete base folder.
		deleteFolderRecursive(options.baseFolder);

		// Create base folder.
		fs.mkdirSync(options.baseFolder, "0766", function (err) {
			if (err) {
				grunt.warn(err);
			}
		});

		// Create image folder.
		fs.mkdirSync(options.baseFolder + "/" + options.imagesFolder, "0766", function (err) {
			if (err) {
				grunt.warn(err);
			}
		});

		// Create fonts folder.
		fs.mkdirSync(options.baseFolder + "/" + options.fontsFolder, "0766", function (err) {
			if (err) {
				grunt.warn(err);
			}
		});

		// Create styles folder.
		fs.mkdirSync(options.baseFolder + "/" + options.stylesFolder, "0766", function (err) {
			if (err) {
				grunt.warn(err);
			}
		});

		var optimizeFile = function (path, css) {
			var assets = css.match(/url\(([^)]+)\)/g),
				notExisting = [],
				counterCopied = 0,
				counterReplaced = 0;

			if (!assets.length) {
				grunt.log("Nothing to optimize for " + path + "!");
				return;
			}

			// Iterate over all assets.
			assets.forEach(function (asset) {
				// Copy asset.
				asset = asset.replace("url(", "").replace(/[\)|"|']/g, "");

				var parts = asset.match(/.+\.([eot|svg|tiff|woff|htc|ttf|png|jpg|jpeg|gif|bmp]+)/),
					folder = options.imagesFolder,
					nodeType = "bildurl",
					nodeTag;

				// Replace url with tag.
				var assetPath = path.substring(0, path.lastIndexOf("/") + 1) + parts[0],
					indexSlash = parts[0].lastIndexOf("/") > -1 ? parts[0].lastIndexOf("/") + 1 : 0,
					fileName = parts[0].substring(indexSlash),
					fileType = parts[1];

				if (fs.existsSync(assetPath)) {
					if (["eot", "tiff", "woff", "htc", "ttf"].indexOf(fileType) > -1) {
						folder = options.fontsFolder;
						nodeType = "dateiurl";
					}
					fs.createReadStream(assetPath).pipe(fs.createWriteStream(options.baseFolder + "/" + folder + "/" + fileName));
					counterCopied++;
				} else {
					if (notExisting.indexOf(fileName) === -1) {
						notExisting.push(fileName);
					}
				}

				// Create node tag.
				nodeTag = "<node " + options.project + "_" + fileName.toLowerCase().replace(/[\.\s]/g, "_").replace(/\-/g, "") + "_" + nodeType + ">"
				if (nodeTags.indexOf(nodeTag) === -1) {
					nodeTags.push(nodeTag);
				}
				css = css.replace(parts[0], nodeTag);
				counterReplaced++;
			});


			// Save CSS file.
			grunt.file.write(options.baseFolder + "/" + options.stylesFolder + "/" + path.substring(path.lastIndexOf("/") + 1), css, { encoding: "utf8" });

			// Log statistics.
			console.log("File: " + path.substring(path.lastIndexOf("/") + 1));
			console.log("Assets: " + assets.length + "    Replaced: " + counterReplaced + "    Copied Files: " + counterCopied);

			if (notExisting.length) {
				console.log("\nNot existing files:");
				console.log(notExisting.join("\n"));
			}
			console.log("\n");
		};


		var nodeTags = [];

		// Work on all CSS files.
		options.css.forEach(function (path) {
			if (!fs.existsSync(path)) {
				grunt.warn("File " + path + " does not exist!");
				return;
			}

			var data = fs.readFileSync(path, {
				encoding: "utf-8"
			});

			optimizeFile(path, data);
		});


		if (nodeTags.length) {
			console.log("Node tags:");
			console.log(nodeTags.join("\n"));

			grunt.file.write(options.baseFolder + "/nodes.txt", nodeTags.join("\n"), { encoding: "utf8" }, function (err) {
				console.log(err);
			});
		}

		done();
	});
};