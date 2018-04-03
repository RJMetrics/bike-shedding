var http = require('http');
var path = require('path');
var fs = require('fs');
var express = require('express');
var Converter  = require("csvtojson").Converter;
var closureBuilder = require('closure-builder');
var glob = closureBuilder.globSupport();
var sass = require('node-sass');
var Watcher = require('node-sass-watcher');
var watch = require('watch');
var open = require("open");



/*
 *
 * Express Dev server: serves public directory to port 3000.
 *
*/
var app = express();
var publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.sendFile(path.join(publicDir, 'index.html'))
});



/*
 *
 * Converts and streams data.csv to json.
 *
*/
var fileStream = fs.createReadStream("data/data.csv");
var jsonData;

var converter = new Converter({constructResult:true});
console.info('Converting CSV to JSON, please wait...');

// emits json object once parsing is finished and starts node server.
converter.on("end_parsed", function (jsonObj) {
    jsonData = jsonObj
    console.info('CSV converted to JSON!');

    var server = http.createServer(app);
    server.listen(app.get('port'), function () {
        console.log('Web server listening on port ' + app.get('port'));
        open('http://localhost:3000/');
    });

});
fileStream.pipe(converter);

app.get("/data",function(req, res){
    res.json(jsonData);
});



/*
 *
 * Compiles es6/7 to browser readable js.
 *
*/
function compileJs() {
    closureBuilder.build({
      name: 'node_bundle_files',
      warn: false,
      srcs: glob([ 'src/js/**/*.js',]),
      out:'public/bundle.js'
    });
}

// watches js folder for changes and recompies js.
watch.watchTree('src/js', function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
        // on initial file tree walkthough
        compileJs();
    } else if (prev === null) {
        // dectects if new files are created.
        console.log('new js file was created!');
    } else if (curr.nlink === 0) {
        // dectects if any files are deleted.
        console.log('js file was deleted!');
    } else {
        // compiles js on file change.
        compileJs();
    }
});



/*
 *
 * Renders and watches sass file.
 *
*/
function render() {
    console.info('Rendering sass...');

    sass.render({
        file: './src/scss/main.scss',
        outFile: './public/css/main.css',
        outputStyle: 'compressed',
        sourceMap: true
    },
    function(error, result) {
        if (!error) {
            fs.writeFile('./public/app.css', result.css, function(err){
                if (!err) {
                    console.info('CSS written to file!');
                }
            });
        }
    });
}

// watches sass
var scssWatcher = new Watcher('./src/scss/main.scss');
scssWatcher.on('init', render);
scssWatcher.on('update', render);
scssWatcher.run();
