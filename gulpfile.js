const gulp = require('gulp');
const fs = require('fs');
const YAML = require('yaml-js');
const resolve = require('json-refs').resolveRefs;
const path = require('path');

gulp.task('build_yml', (done) => {
	var root = YAML.load(fs.readFileSync('swagger_source/index.yaml').toString());
	var options = {
	  filter        : ['relative', 'remote'],
	  loaderOptions : {
		processContent : function (res, callback) {
		  callback(null, YAML.load(res.text));
		}
	  }
	};
	resolve(root, options).then(function (results) {
	  console.log(YAML.dump(results.resolved));
	  fs.writeFile(path.resolve(__dirname + '/api/swagger/swagger.yaml'), YAML.dump(results.resolved), done);
	});
});

gulp.task('swagger', ['build_yml'], (done) => {
	fs.readFile(path.resolve(__dirname + '/api/swagger/swagger.yaml'), (err, contents) => {
		if (err) {
			throw err;
		}
		var jsonYaml = YAML.load(contents);
		fs.writeFile(path.resolve(__dirname + '/public/json/getty.json'), JSON.stringify(jsonYaml, null, 2), done); 
	});
});